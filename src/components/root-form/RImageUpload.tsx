import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDropzone } from 'react-dropzone';
import { Cancel, CloudUpload, FileUpload } from '@mui/icons-material';
import { useFormContext, Controller, Path } from 'react-hook-form';

import CustomAvatar from '../Avatar';
import locales from '../../locales';
import { createPresignedUrl, uploadFileToS3 } from '../../services/commonService';
import { ResponeStatus } from '../../enums/common';
import CONFIG from '../../config';
import { Fancybox } from '@fancyapps/ui';
import { TImageUpload } from '../../interfaces/common';

const Dropzone = styled('div', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  border: '2px dashed',
  borderColor: active ? theme.palette.primary.main : theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(5),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'border-color 0.3s',
  [theme.breakpoints.down('sm')]: {
    paddingInline: theme.spacing(5),
  },
}));

type TFileProp = {
  name: string;
  type: string;
  size: number;
  preview: string;
  path: string;
  file?: File; // giữ file gốc cho upload
  isFromServer?: boolean;
};

type TImageUploadProps<T extends Record<string, any>> = {
  name: Path<T>;
  label?: string;
  description?: string;
  multiple?: boolean;
};

const RImageUpload = <T extends Record<string, any>>({
  name,
  label = '',
  description,
  multiple = true,
}: TImageUploadProps<T>) => {
  const { control } = useFormContext<T>();
  const { common: t_common } = locales['vi'];
  const initializedRef = useRef(false);
  const [loading, setLoading] = useState<boolean>(false)
  Fancybox.bind('[data-fancybox]', {});

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        const [files, setFiles] = useState<TFileProp[]>([]);
        const buildLinkViewFromPath = (path: string): string => {
          const DOMAIN = CONFIG.DOMAIN_URL;
          return `${DOMAIN}/${path}`;
        };

        useEffect(() => {
          if (initializedRef.current || !value) return;
          const fileList = value ? (Array.isArray(value) ? value : [value]) : [];
          const initial: TFileProp[] = fileList
            .map((item) => {
              if (!item) return null;
              if (
                typeof item === 'object' &&
                'path' in item &&
                'type' in item &&
                'size' in item
              ) {
                const path = item as TImageUpload;
                return {
                  name: path.path?.split('/').pop() || 'server-image',
                  type: path.type,
                  size: path.size,
                  preview: buildLinkViewFromPath(path.path),
                  path: path.path,
                  isFromServer: true,
                };
              }

              if (
                typeof item === 'object' &&
                'name' in item &&
                'type' in item &&
                'size' in item
              ) {
                const file = item as File;
                return {
                  name: file.name,
                  type: file.type,
                  size: file.size,
                  preview: URL.createObjectURL(file),
                  path: '', 
                  file,
                  isFromServer: false,
                };
              }

              return null;
            })
            .filter((item): item is NonNullable<typeof item> => item !== null);

          setFiles(initial);
          initializedRef.current = true;
        }, [value]);

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
          multiple,
          onDrop: async (acceptedFiles: File[]) => {
            const uploadedFiles: TFileProp[] = [];
            setLoading(true)
            try {
              for (const file of acceptedFiles) {
                try {
                  const res = await createPresignedUrl(file);
                  if (res.status === ResponeStatus.SUCCESS) {
                    await uploadFileToS3(res.data.url, file);

                    uploadedFiles.push({
                      name: file.name,
                      type: file.type,
                      size: file.size,
                      preview: res.data.link_view,
                      path: res.data.path,
                      file,
                      isFromServer: true,
                    });
                  }
                } catch (err) {
                  console.error("Upload failed for:", file.name, err);
                }
              }

              const updated = multiple ? [...files, ...uploadedFiles] : uploadedFiles;
              setFiles(updated);

              const result = multiple
                ? updated.map((f) => ({ path: f.path, size: f.size, type: f.type })).filter(Boolean)
                : { path: updated[0].path, size: updated[0].size, type: updated[0].type };
              onChange(result);
            } finally {
              setLoading(false);
            }
          },
        });

        const handleRemoveFile = (pathOrPreview: string) => {
          const updated = files.filter(
            (f) => f.path !== pathOrPreview && f.preview !== pathOrPreview
          );
          setFiles(updated);

          const result = multiple
            ? updated.map((f) => f.path).filter(Boolean)
            : null;

          onChange(result);
        };

        const handleRemoveAllFiles = () => {
          setFiles([]);
          onChange(multiple ? [] : null);
        };

        return (
          <>
            <Dropzone active={isDragActive} {...getRootProps()}>
              <Box
                className="dropzone"
                sx={{
                  borderColor: 'divider',
                  borderRadius: 2,
                }}
              >
                <input {...getInputProps()} />
                <Stack alignItems="center" spacing={1} textAlign="center" sx={{ cursor: 'pointer' }}>
                    {loading ? <CircularProgress size={28} sx={{ color: 'primary' }} /> : <CloudUpload sx={{ fontSize: 54 }} />}
                  <Button variant="contained" size="small">
                    {label}
                  </Button>
                  {description && (
                    <Typography variant="body1" color="secondary.light">
                      {description}
                    </Typography>
                  )}
                </Stack>
              </Box>
            </Dropzone>
            {files.length > 0 && (
              <Stack spacing={2} mt={2}>
                <Stack direction={'row'} spacing={2}>
                  {files.map((file) => (
                    <Box
                      key={file.name}
                      sx={{
                        px: 1,
                        py: 1,
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        mb: 1,
                      }}
                    >
                      <Stack direction="row" spacing={2} width="100%">
                        <Box
                          sx={{
                            position: 'relative',
                            width: 80,
                            height: 80,
                            borderRadius: 2,
                          }}
                        >
                          <a data-fancybox="image" data-src={file.preview} href={file.preview}>
                            <img width={80} height={80} alt={'Image'} src={file.preview} style={{ objectFit: 'cover' }} />
                          </a>
                          <IconButton onClick={() => handleRemoveFile(file.path)}
                            sx={{ height: 40, position: 'absolute', top: -15, right: -15, zIndex: 1 }}
                          >
                            <Cancel color="error" />
                          </IconButton>
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
                {multiple && <Stack direction="row" spacing={2}>
                  <Button color="error" variant="outlined" onClick={handleRemoveAllFiles} startIcon={<Cancel />}>
                    {t_common.removeAll}
                  </Button>
                </Stack>}
              </Stack>
            )}
          </>
        );
      }}
    />
  );
};

export default RImageUpload;
