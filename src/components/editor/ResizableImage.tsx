import Image from '@tiptap/extension-image'
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import { ResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'
import React, { useLayoutEffect, useRef, useState } from 'react'

function ResizableImageView(props: NodeViewProps) {
  const { node, updateAttributes, selected } = props
  const { src, alt, title, width, height, alignment } = node.attrs

  const [size, setSize] = useState<{ w: number; h: number }>(() => ({
    w: Number.isFinite(width) ? width : 320,
    h: Number.isFinite(height) ? height : 180,
  }))

  const [maxW, setMaxW] = useState<number>(Infinity)

  const imgRef = useRef<HTMLImageElement | null>(null)
  const wrapperRef = useRef<HTMLSpanElement | null>(null)

  useLayoutEffect(() => {
    const img = imgRef.current
    if (!img) return
    const applyRatio = () => {
      const ratio = img.naturalHeight / img.naturalWidth || 0.5625
      const w = Number.isFinite(width) ? width : 320
      const h = Number.isFinite(height) ? height : Math.max(1, Math.round(w * ratio))
      setSize({ w, h })
      updateAttributes({ width: w, height: h })
    }
    if (img.complete && img.naturalWidth) applyRatio()
    else img.addEventListener('load', applyRatio, { once: true })
  }, [src])

  useLayoutEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const ro = new ResizeObserver(() => {
      const currentMax = Math.floor(el.clientWidth || el.getBoundingClientRect().width || 0)
      if (!currentMax) return
      setMaxW(currentMax)

      if (size.w > currentMax) {
        const ratio = size.h / Math.max(1, size.w)
        const newW = currentMax
        const newH = Math.max(1, Math.round(newW * ratio))
        setSize({ w: newW, h: newH })
        updateAttributes({ width: newW, height: newH })
      }
    })

    ro.observe(el)
    return () => ro.disconnect()
  }, [wrapperRef.current])

  return (
    <NodeViewWrapper
      ref={wrapperRef}
      className={`resizable-image ${selected ? 'is-selected' : ''}`}
      contentEditable={false}
      as="span"
      onMouseDown={(e: any) => e.stopPropagation()}
      onTouchStart={(e: any) => e.stopPropagation()}
      style={{
        display: 'block',
        position: 'relative',
        textAlign: alignment === 'center' ? 'center' : alignment === 'right' ? 'right' : 'left',
      }}
    >
      <ResizableBox
        width={size.w}
        height={size.h}
        lockAspectRatio
        resizeHandles={['se']}
        draggableOpts={{ enableUserSelectHack: false }}
        maxConstraints={[Number.isFinite(maxW) ? maxW : size.w, Infinity]}
        minConstraints={[50, 30]}
        onResizeStart={(e) => { e.stopPropagation(); e.preventDefault() }}
        onResize={(_e, data) => setSize({ w: data.size.width, h: data.size.height })}
        onResizeStop={(_e, data) => {
          const clampedW = Math.min(data.size.width, Number.isFinite(maxW) ? maxW : data.size.width)
          const clampedH = data.size.height * (clampedW / Math.max(1, data.size.width))
          setSize({ w: Math.round(clampedW), h: Math.round(clampedH) })
          updateAttributes({ width: Math.round(clampedW), height: Math.round(clampedH) })
        }}
        style={{ display: 'inline-block', verticalAlign: 'bottom', maxWidth: '100%' }}
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt || ''}
          title={title || ''}
          draggable={false}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
      </ResizableBox>
    </NodeViewWrapper>
  )
}

export const ResizableImage = Image.extend({
  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
      width: { default: null },
      height: { default: null },
      alignment: {
        default: 'center', // 'left' | 'center' | 'right'
        parseHTML: (element) => element.getAttribute('data-align') || 'left',
        renderHTML: (attributes) => ({ 'data-align': attributes.alignment }),
      },
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageView, {
      stopEvent: ({ event }) => {
        const el = event.target as HTMLElement
        return !!el.closest('.resizable-image')
      },
    })
  },
})
