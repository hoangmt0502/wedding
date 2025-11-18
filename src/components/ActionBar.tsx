import React, { useRef } from "react";
import { alpha, Box, Button, CircularProgress, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import {
  Visibility,
  Edit,
  Delete,
  Add,
  CameraAlt,
  ExpandMore,
  ExpandLess,
  ScreenshotMonitor,
  AddCircle,
  FileUpload,
  FileDownload,
  Print,
  Description,
} from "@mui/icons-material";
import { useResponsive } from "../hooks/useResponsive";
import DefaultWrapper from "./wrapper/DefaultWrapper";
import locales from "../locales";


const { common: t_common } = locales["vi"];

type TProps = {
  selectedItems?: any[];
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onAdd?: () => void;
  onImportExcel?: (file: File) => Promise<void>;
  onExportExcel?: () => Promise<void>;
  onPrint?: () => Promise<void>;
  onExportExample?: () => Promise<void>;
  label?: string;
  labelAdd?: string;
  onCapture?: VoidFunction;
  extraButtons?: React.ReactNode[];
  isSearchBoxOpen?: boolean;
  isShowSelected?: boolean;
  isImporting?: boolean;
  isPrinting?: boolean;
  isExporting?: boolean;
  toggleSearchBox?: () => void;
  sx?: React.CSSProperties;
};

const ActionBar = ({
  selectedItems = [],
  onView,
  onEdit,
  onDelete,
  onAdd,
  onImportExcel,
  onExportExcel,
  onPrint,
  onExportExample,
  label,
  labelAdd,
  onCapture,
  extraButtons = [],
  isSearchBoxOpen,
  isShowSelected = true,
  isPrinting = false,
  isImporting = false,
  isExporting = false,
  toggleSearchBox,
  sx = {}
}: TProps) => {
  const { isMobile } = useResponsive();
  const theme = useTheme();
  const [isLoadingExport, setIsLoadingExport] = React.useState(false);
  const [isLoadingPrint, setIsLoadingPrint] = React.useState(false);
  const [isLoadingImport, setIsLoadingImport] = React.useState(false);
  const [isLoadingExportExample, setIsLoadingExportExample] = React.useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClickImport = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (file && onImportExcel) {
      setIsLoadingImport(true);
      await onImportExcel(file);
      setIsLoadingImport(false);
    }
    e.currentTarget.value = "";
  };

  const handleExport = async () => {
    if (onExportExcel) {
      setIsLoadingExport(true);
      await onExportExcel();
      setIsLoadingExport(false);
    }
  }

  const handlePrint = async () => {
    if (onPrint) {
      setIsLoadingPrint(true);
      await onPrint();
      setIsLoadingPrint(false);
    }
  }

  const handleExportExample = async () => {
    if (onExportExample) {
      setIsLoadingExportExample(true);
      await onExportExample();
      setIsLoadingExportExample(false);
    }
  }

  return (
    <DefaultWrapper sx={{p: 0, ...sx}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "20px",
            alignSelf: { xs: "flex-end", sm: "center" },
          }}
        >
          {toggleSearchBox && <Tooltip title={isSearchBoxOpen ? t_common.showFilter : t_common.hideFilter} placement="top">
              <Button
                variant="outlined"
                color="primary"
                startIcon={
                  isSearchBoxOpen ? (
                    <ExpandLess sx={{ marginLeft: "0px", marginRight: "-10px" }} />
                  ) : (
                    <ExpandMore sx={{ marginLeft: "0px", marginRight: "-10px" }} />
                  )
                }
                sx={{ height: '36px' }}
                onClick={toggleSearchBox}
              >
                {isSearchBoxOpen ? "" : ""}
              </Button>
            </Tooltip>}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: selectedItems.length > 0 ? "center" : "flex-end",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
            flex: 1,
          }}
        >
          {<Box sx={{ display: "flex", alignItems: "center" }}>
            {label && isShowSelected && selectedItems.length > 0 && (
              <Typography>
                <b>{selectedItems.length}</b> {label}
              </Typography>
            )}
          </Box>}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {selectedItems.length > 0 && (
              <>
                {onView && (
                  <Tooltip title={t_common.viewDetails} placement="top">
                    <IconButton size={'small'} color="primary" onClick={onView}
                      sx={{
                        bgcolor: "info.main",
                        borderRadius: '6px',
                        color: "white",
                        height: '34.5px',
                        width: '34.5px',
                        "&:hover": {
                          bgcolor: "info.dark",
                        },
                      }}
                    >
                      <Visibility sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                )}
                {onEdit && (
                  <Tooltip title={t_common.edit} placement="top">
                    <IconButton
                      size="small"
                      onClick={onEdit}
                      sx={{
                        bgcolor: "warning.main",
                        borderRadius: "6px",
                        color: "white",
                        height: "34.5px",
                        width: "34.5px",
                        "&:hover": {
                          bgcolor: "warning.dark",
                        },
                      }}
                    >
                      <Edit sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                )}
                {onDelete && (
                  <Tooltip title={t_common.delete} placement="top">
                    <IconButton size={'small'} color="error" onClick={onDelete}
                      sx={{
                        bgcolor: "error.main",
                        borderRadius: '6px',
                        color: "white",
                        height: '34.5px',
                        width: '34.5px',
                        "&:hover": {
                          bgcolor: "error.dark",
                        },
                      }}
                    >
                      <Delete sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                )}
              </>
            )}
            {onCapture && (
              <Tooltip title={t_common.captures} placement="top">
                <IconButton size={'small'} color="error" onClick={onCapture}
                  sx={{
                    bgcolor: "error.main",
                    borderRadius: '6px',
                    color: "white",
                    height: '34.5px',
                    width: '34.5px',
                    "&:hover": {
                      bgcolor: "error.dark",
                    },
                  }}
                >
                  <ScreenshotMonitor sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            )}
            {onExportExample && <Tooltip title={t_common.exportExampleExcel}>
              <IconButton 
                onClick={handleExportExample}
                sx={{
                  bgcolor: "error.main",
                  borderRadius: '6px',
                  color: "white",
                  height: '34.5px',
                  width: '34.5px',
                  "&:hover": {
                    bgcolor: "error.dark",
                  },
                }}
                loading={isLoadingExportExample}
              >
                <Description sx={{fontSize: 18}}/>
              </IconButton>
            </Tooltip>}
            {onImportExcel && (
              <>
                <Tooltip title={t_common.importExcel} placement="top">
                  <IconButton
                    size={"small"}
                    onClick={handleClickImport}
                    sx={{
                      bgcolor: "info.main",
                      borderRadius: "6px",
                      color: "white",
                      height: "34.5px",
                      width: "34.5px",
                      "&:hover": {
                        bgcolor: "info.dark",
                      },
                    }}
                    loading={isLoadingImport}
                  >
                    <FileUpload sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </>
            )}
            {onExportExcel && <Tooltip title={t_common.exportExcel} placement="top">
              <IconButton loading={isLoadingExport} size={'small'} color="error" onClick={handleExport}
                sx={{
                  bgcolor: "warning.main",
                  borderRadius: '6px',
                  color: "white",
                  height: '34.5px',
                  width: '34.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  "&:hover": {
                    bgcolor: "warning.dark",
                  },
                }}
              >
                <FileDownload sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>}
            {onPrint && <Tooltip title={t_common.print} placement="top">
              <IconButton loading={isLoadingPrint} size={'small'} color="error" onClick={handlePrint}
                sx={{
                  bgcolor: "success.main",
                  borderRadius: '6px',
                  color: "white",
                  height: '34.5px',
                  width: '34.5px',
                  "&:hover": {
                    bgcolor: "success.dark",
                  },
                }}
              >
                <Print sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>}
            {extraButtons &&
              extraButtons.map((button, index) => (
                <React.Fragment key={index}>{button}</React.Fragment>
              ))}
            {onAdd && (
              <Button
                size={isMobile ? "small" : "medium"}
                variant="contained"
                color="primary"
                startIcon={<AddCircle fontSize={'large'} />}
                onClick={onAdd}
                sx={{
                  fontSize: "0.875rem",
                  bgcolor: alpha(theme.palette.primary.dark, 0.8),
                  borderRadius: "6px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                {labelAdd || 'Thêm mới'}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </DefaultWrapper>
  );
};

export default ActionBar;
