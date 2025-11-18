import { Editor } from "@tiptap/react";
import { Tooltip, IconButton, Menu, MenuItem } from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  StrikethroughS,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
  FormatColorText,
  FormatColorFill,
  FormatQuote,
  Code,
  Redo,
  Undo,
  Image,
  Link,
  HorizontalRule,
  FormatListBulleted,
  FormatListNumbered,
  TaskAlt,
  Title,
  TableChart,
  BorderBottom,
  BorderRight,
  DeleteSweep,
  ViewColumn,
  Delete,
  Brush,
} from "@mui/icons-material";
import { useState } from "react";
import ColorPicker from "./ColorPicker";
import { TMode } from "../root-form/REditor";
import InsertImageButtonWithUpload from "./InsertImageButtonWithUpload";

interface Props {
  editor: Editor;
  mode?: TMode
}

export const RToolbar = ({ editor, mode = 'full' }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if (!editor) return null;

  const handleHeadingClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const isBase = mode === "base" || mode === "simple" || mode === "full";
  const isSimple = mode === "simple" || mode === "full";
  const isFull = mode === "full";

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {isBase && <>
        <Tooltip title='In đậm'>
          <IconButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            color={editor.isActive("bold") ? "primary" : "default"}
          >
            <FormatBold />
          </IconButton>
        </Tooltip>
        <Tooltip title='In nghiêng'>
          <IconButton
            disabled={editor.isActive("codeBlock")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            color={editor.isActive("italic") ? "primary" : "default"}
          >
            <FormatItalic />
          </IconButton>
        </Tooltip>
        <Tooltip title='Gạch chân'>
          <IconButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            color={editor.isActive("underline") ? "primary" : "default"}
          >
            <FormatUnderlined />
          </IconButton>
        </Tooltip>
        <Tooltip title='Gạch ngang'>
          <IconButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            color={editor.isActive("strike") ? "primary" : "default"}
          >
            <StrikethroughS />
          </IconButton>
        </Tooltip>
        <Tooltip title='Danh sách không thứ tự'>
          <IconButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            color={editor.isActive("bulletList") ? "primary" : "default"}
          >
            <FormatListBulleted />
          </IconButton>
        </Tooltip>
        <Tooltip title='Danh sách có thứ tự'>
          <IconButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            color={editor.isActive("orderedList") ? "primary" : "default"}
          >
            <FormatListNumbered />
          </IconButton>
        </Tooltip>
        <Tooltip title='Căn trái'>
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            color={editor.isActive({ textAlign: "left" }) ? "primary" : "default"}
          >
            <FormatAlignLeft />
          </IconButton>
        </Tooltip>
        <Tooltip title='Căn giữa'>
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            color={
              editor.isActive({ textAlign: "center" }) ? "primary" : "default"
            }
          >
            <FormatAlignCenter />
          </IconButton>
        </Tooltip>
        <Tooltip title='Căn phải'>
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            color={
              editor.isActive({ textAlign: "right" }) ? "primary" : "default"
            }
          >
            <FormatAlignRight />
          </IconButton>
        </Tooltip>
        <Tooltip title='Căn đều'>
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            color={
              editor.isActive({ textAlign: "justify" }) ? "primary" : "default"
            }
          >
            <FormatAlignJustify />
          </IconButton>
        </Tooltip>
  
        <Tooltip title='Tiêu đề'>
          <IconButton onClick={handleHeadingClick}>
            <Title />
          </IconButton>
        </Tooltip>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {[1, 2, 3, 4, 5, 6].map((level: any) => (
            <MenuItem
              key={level}
              onClick={() => {
                editor.chain().focus().toggleHeading({ level }).run();
                handleClose();
              }}
              selected={editor.isActive("heading", { level })}
            >
              H{level}
            </MenuItem>
          ))}
        </Menu>
        <ColorPicker
          tooltip='Màu chữ'
          type={"text"}
          icon={<FormatColorText fontSize='small' />}
          currentColor={editor.getAttributes("textStyle")?.color}
          onChange={(color) => editor.chain().focus().setColor(color).run()}
        />
      </>}
      {isSimple && <>
  
        <ColorPicker
          tooltip='Màu nền'
          icon={<FormatColorFill fontSize='small' />}
          currentColor={editor.getAttributes("highlight")?.color}
          onChange={(color) =>
            editor.chain().focus().setHighlight({ color }).run()
          }
          type={"background"}
        />
         <Tooltip title='Checklist'>
          <IconButton
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            color={editor.isActive("taskList") ? "primary" : "default"}
          >
            <TaskAlt />
          </IconButton>
        </Tooltip>
        <Tooltip title='Liên kết'>
          <IconButton
            onClick={() => {
              const url = prompt("Nhập URL:");
              if (url)
                editor
                  .chain()
                  .focus()
                  .extendMarkRange("link")
                  .setLink({ href: url })
                  .run();
            }}
            color={editor.isActive("link") ? "primary" : "default"}
          >
            <Link />
          </IconButton>
        </Tooltip>
  
        <InsertImageButtonWithUpload  editor={editor}/>
  
        <Tooltip title='Trích dẫn'>
          <IconButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            color={editor.isActive("blockquote") ? "primary" : "default"}
          >
            <FormatQuote />
          </IconButton>
        </Tooltip>
      </>}

      {isFull && <>
        <Tooltip title='Dòng kẻ ngang'>
          <IconButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <HorizontalRule />
          </IconButton>
        </Tooltip>
  
        <Tooltip title='Mã code'>
          <IconButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            color={editor.isActive("codeBlock") ? "primary" : "default"}
          >
            <Code />
          </IconButton>
        </Tooltip>
  
        <Tooltip title='Hoàn tác'>
          <IconButton onClick={() => editor.chain().focus().undo().run()}>
            <Undo />
          </IconButton>
        </Tooltip>
  
        <Tooltip title='Làm lại'>
          <IconButton onClick={() => editor.chain().focus().redo().run()}>
            <Redo />
          </IconButton>
        </Tooltip>
  
        <Tooltip title='Thêm bảng'>
          <IconButton
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
          >
            <TableChart />
          </IconButton>
        </Tooltip>
  
        <ColorPicker
          tooltip='Màu nền ô bảng'
          type={"text"}
          icon={<Brush fontSize='small' />}
          currentColor={editor.getAttributes("tableCell")?.backgroundColor}
          onChange={(color) => {
            (editor as any).commands?.setHoverActive(false);
            (editor as any).chain().focus()?.setCellBackgroundColor(color).run();
          }}
        />
  
        <Tooltip title='Thêm hàng dưới'>
          <IconButton onClick={() => editor.chain().focus().addRowAfter().run()}>
            <BorderBottom />
          </IconButton>
        </Tooltip>
  
        <Tooltip title='Thêm cột phải'>
          <IconButton
            onClick={() => editor.chain().focus().addColumnAfter().run()}
          >
            <BorderRight />
          </IconButton>
        </Tooltip>
  
        <Tooltip title='Xoá hàng'>
          <IconButton onClick={() => editor.chain().focus().deleteRow().run()}>
            <DeleteSweep />
          </IconButton>
        </Tooltip>
  
        <Tooltip title='Xoá cột'>
          <IconButton onClick={() => editor.chain().focus().deleteColumn().run()}>
            <ViewColumn />
          </IconButton>
        </Tooltip>
  
        <Tooltip title='Xoá bảng'>
          <IconButton onClick={() => editor.chain().focus().deleteTable().run()}>
            <Delete />
          </IconButton>
        </Tooltip>
      </>}
    </div>
  );
};
