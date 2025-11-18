import { useFormContext, Controller, RegisterOptions } from "react-hook-form";
import { Box, BoxProps, Paper, Typography } from "@mui/material";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextStyle from "@tiptap/extension-text-style";
import { createLowlight } from "lowlight";
import javascript from "highlight.js/lib/languages/javascript";
import { RToolbar } from "../editor/RToolbarEditor";
import { RTableCellTiptap } from "../editor/RTableCellTiptap";
import { RTableHeaderTiptap } from "../editor/RTableHeaderTiptap";
import { TableSelectionHighlight } from "../editor/TableSelectionHighlight";
import { ResizableImage } from "../editor/ResizableImage";
const lowlight = createLowlight();
lowlight.register("javascript", javascript);

export type TMode = 'base' | 'simple' | 'full'

type Props<T extends Record<string, any>> = {
  name: keyof T;
  rules?: RegisterOptions;
  label?: string;
  placeholder?: string;
  minHeight?: number;
  isHighlight?: boolean;
  mode?: TMode
} & BoxProps;

export default function REditor<T extends Record<string, any>>({
  name,
  rules,
  label,
  placeholder = "Nhập nội dung...",
  minHeight = 150,
  isHighlight = false,
  mode = 'full',
  ...other
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name as string}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const editor = useEditor({
          extensions: [
            StarterKit.configure({
              codeBlock: false,
            }),
            Table.configure({
              resizable: true,
              HTMLAttributes: {
                class: "my-custom-table",
              },
            }),
            TableRow,
            RTableCellTiptap,
            RTableHeaderTiptap,
            TableSelectionHighlight,
            Underline,
            TextAlign.configure({
              types: ["heading", "paragraph"],
            }),
            TextStyle, 
            Color,
            Highlight.configure({ multicolor: true }),
            Link.configure({
              openOnClick: false,
            }),
            ResizableImage,
            TaskList,
            TaskItem.configure({
              nested: true,
            }),
            CodeBlockLowlight.configure({
              lowlight,
            }),
          ],
          content: field.value || "",
          onUpdate: ({ editor }) => {
            const value = editor.getHTML() === '<p></p>' ? "" : editor.getHTML();
            field.onChange(value);
          },
        });

        if (!editor) return <Box />;

        return (
          <Box {...other}>
            <Paper
              variant='outlined'
              sx={{
                p: 2,
                borderColor: error ? "error.main" : isHighlight ? 'primary.main' : "#c0c2ce",
                borderWidth: isHighlight ? 2 : 1,
                "& .ProseMirror": {
                  outline: "none",
                },
              }}
            >
              {label && (
                <Typography
                  variant='body2'
                  sx={{ mb: 1 }}
                  color={error ? "error" : isHighlight ? 'primary' : "text.primary"}
                  fontWeight={isHighlight ? '700' : '400'}
                >
                  {label}
                </Typography>
              )}

              <RToolbar editor={editor} mode={mode}/>

              <EditorContent
                editor={editor}
                onClick={() => editor?.commands.focus()}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  minHeight,
                  padding: "12px",
                  outline: "none",
                  fontSize: 14,
                  cursor: "text",
                  width: "100%",
                }}
                placeholder={placeholder}
              />
            </Paper>
            {error && (
              <Typography variant='caption' color='error' mt={0.5} mx={1.75}>
                {error.message}
              </Typography>
            )}
          </Box>
        );
      }}
    />
  );
}
