import { TableHeader } from '@tiptap/extension-table-header'

export const RTableHeaderTiptap = TableHeader.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: element => element.style.backgroundColor || null,
        renderHTML: attributes => {
          if (!attributes.backgroundColor) return {}
          return {
            style: `background-color: ${attributes.backgroundColor};`,
          }
        },
      },
    }
  },
})
