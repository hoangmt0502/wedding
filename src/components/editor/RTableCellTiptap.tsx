import { TableCell } from '@tiptap/extension-table-cell'
import { EditorState, Transaction } from 'prosemirror-state';
import { Node as ProseMirrorNode } from 'prosemirror-model';

export const RTableCellTiptap = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.style.backgroundColor || null,
        renderHTML: (attributes) => {
          if (!attributes.backgroundColor) return {}
          return {
            style: `background-color: ${attributes.backgroundColor};`,
          }
        },
      },
    }
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setCellBackgroundColor: (color: string) => ({ state, dispatch } : {
        state: EditorState;
        dispatch?: (tr: Transaction) => void;
      }) => {
        const { tr, selection } = state
        const { ranges } = selection as any
        const cellTypes = [
          state.schema.nodes.tableCell,
          state.schema.nodes.tableHeader,
        ];

        ranges.forEach((range: any) => {
          state.doc.nodesBetween(range.$from.pos, range.$to.pos, (node, pos) => {
            if (cellTypes.includes(node.type)) {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                backgroundColor: color,
              });
            }
          });
        });

        if (tr.docChanged) {
          dispatch?.(tr);
          return true;
        }

        return false;
      },
    }
  },
})
