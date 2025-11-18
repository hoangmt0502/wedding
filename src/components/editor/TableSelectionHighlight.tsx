import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'
import { CellSelection } from 'prosemirror-tables'

const pluginKey = new PluginKey('tableSelectionHighlight')

export const TableSelectionHighlight = Extension.create({
  name: 'tableSelectionHighlight',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: pluginKey,
        state: {
          init: () => true,
          apply(tr, value) {
            const meta = tr.getMeta(pluginKey)
            if (typeof meta === 'boolean') {
              return meta
            }
            return value
          },
        },
        props: {
          decorations(state) {
            // const isHoverActive = this.getState(state)
            // if (!isHoverActive) return null
            if (!(state.selection instanceof CellSelection)) return null

            const decorations: any[] = []
            state.selection.forEachCell((cell, pos) => {
              decorations.push(
                Decoration.node(pos, pos + cell.nodeSize, {
                  class: 'selected-hover-cell',
                }),
              )
            })

            return DecorationSet.create(state.doc, decorations)
          },
        },
      }),
    ]
  },

  addCommands(): any {
    return {
      setHoverActive:
        (active: boolean) =>
        ({ tr, dispatch }: any) => {
          dispatch?.(tr.setMeta(pluginKey, active))
          return true
        },
    }
  },
})
