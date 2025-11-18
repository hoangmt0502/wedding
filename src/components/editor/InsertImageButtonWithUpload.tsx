import { IconButton, Tooltip, CircularProgress } from '@mui/material';
import { Image } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useState, useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { createPresignedUrl, uploadFileToS3 } from '../../services/commonService';

type Props = {
  editor: Editor;
};

const InsertImageButtonWithUpload = ({ editor }: Props) => {
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;

      setLoading(true);

      try {
        const file = acceptedFiles[0]; // chỉ chọn 1 ảnh
        const res = await createPresignedUrl(file);
        if (res.status === 'success') {
          await uploadFileToS3(res.data.url, file);
          const imageUrl = res.data.link_view.split('?')[0];

          // chèn ảnh vào Tiptap editor
          editor.chain().focus().setImage({ src: imageUrl }).run();
        }
      } catch (err) {
        console.error('Image upload failed:', err);
      } finally {
        setLoading(false);
      }
    },
    [editor]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop,
  });

  return (
    <Tooltip title="Chèn ảnh">
      <span {...getRootProps()}>
        <input {...getInputProps()} />
        <IconButton component="span" disabled={loading}>
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            <Image />
          )}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default InsertImageButtonWithUpload;
