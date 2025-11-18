import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Stack,
  Popover,
  TextField,
  Button,
  useTheme,
  styled,
  BoxProps,
  PaletteMode,
  alpha,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { HexColorPicker } from 'react-colorful';
import { Brightness7, Check, ColorLens, DarkMode, DesktopMac, Refresh } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { selectTheme, setMode, ThemeColor, setThemeColor, setCustomColorOverrides, resetCustomColorOverrides, loadUserColorsFromFile, setUserThemeColor } from '../../store/slices/themeSlice';
import { getSystemMode } from '../../utils/themeMode';
import DefaultPalette from '../../theme/palette';

interface Props {
  open: boolean;
  onClose: () => void;
}

const ColorBox = styled(Box)<BoxProps>(({ theme }) => ({
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: 8,
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  margin: theme.spacing(0, 1.5),
  color: theme.palette.common.white,
  transition: 'box-shadow .25s ease'
}));

const SettingsSidebar: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const { mode, customColors, themeColor, isChanged, userThemeColor } = useAppSelector(selectTheme);
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [activeKey, setActiveKey] = useState<keyof ReturnType<typeof DefaultPalette>['custom'] | 'userThemeColor' | null>(null);

  const openPopover = Boolean(anchorEl);
  const modeResolve = mode === 'system' ? getSystemMode() : mode;

  useEffect(() => {
    dispatch(loadUserColorsFromFile());
  }, [dispatch]);


  const handleOpenPopover = (
    event: React.MouseEvent<HTMLElement>,
    key: keyof ReturnType<typeof DefaultPalette>['custom'] | 'userThemeColor'
  ) => {
    setAnchorEl(event.currentTarget);
    setActiveKey(key);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setActiveKey(null);
  };

  const handleChangeCustomColor = (key: keyof ReturnType<typeof DefaultPalette>['custom'] | 'userThemeColor', value: string) => {
    if (key === 'userThemeColor') {
      dispatch(setUserThemeColor(value))
    } else {
      dispatch(setCustomColorOverrides({ [key]: value }));
    }
  };

  const handleResetCustomColor = () => {
    dispatch(resetCustomColorOverrides());
    dispatch(setUserThemeColor(undefined));
  };

  const handleChangeMode = (modeSelect: PaletteMode | 'system') => {
    dispatch(setMode(modeSelect))
  }

  const handleChangeThemeColors = (value: ThemeColor) => {
    dispatch(setThemeColor(value))
    dispatch(setUserThemeColor(undefined))

  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 360,
          bgcolor:
            modeResolve === 'light' || !customColors.darkBg
              ? customColors.lightBg
              : customColors.darkBg,
          color: '#222',
        }
      }}
      ModalProps={{
        BackdropProps: {
          invisible: true,
          sx: { backgroundColor: 'transparent' }, // đảm bảo không có màu nền
        },
      }}
    >
      <Box py={2} pl={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center"
          sx={{pr: 2}}
        >
          <Box>
            <Typography variant="h6" fontSize={17} color="textPrimary">
              Tuỳ chỉnh giao diện
            </Typography>
            <Typography variant="body2" fontSize={14} color="textSecondary">
              Customize and preview in real time
            </Typography>
          </Box>
          <Stack direction={'row'} alignItems={'center'}>
            <Tooltip title="Khôi phục mặc định" placement='bottom'>
              <IconButton onClick={handleResetCustomColor} sx={{ color: modeResolve === 'light' ? '#585e7d' : '#b5b9ce', position: 'relative', }}>
                {isChanged && <Box sx={{
                  background: '#f00',
                  position: 'absolute',
                  top: 10,
                  right: 6,
                  height: 8,
                  width: 8,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  lineHeight: '10px',
                  zIndex: 10000,
                  transition: 'opacity 0.3s ease-in-out',
                  transform: 'translateY(-50%)'
                }} />}
                <Refresh />
              </IconButton>
            </Tooltip>
            <Tooltip title="Đóng" placement='bottom'>
              <IconButton onClick={onClose} sx={{
                color: modeResolve === 'light' ? '#585e7d' : '#b5b9ce'
              }}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <Divider sx={{ my: 2, borderColor: 'primary.dark' }} />
        </Stack>

        <Box sx={{ flex: 1, overflow: 'hidden', height: 'calc(100vh - 120px)' }}>
          <PerfectScrollbar options={{ wheelPropagation: false }}
            style={{ direction: 'ltr', paddingRight: 16 }}
            containerRef={(ref) => {
              if (ref) {
                ref.style.direction = 'ltr' // force style khi prop không ăn
              }
            }}
          >
            <Typography variant="body1" fontSize={15} color="textPrimary" sx={{ mb: 1 }}>Chế độ giao diện</Typography>
            <Stack direction={'row'} spacing={2} justifyContent="stretch">
              <Stack sx={{ flex: 1 }}>
                <ColorBox
                  onClick={() => handleChangeMode('light')}
                  sx={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: mode === "light" ? "primary.light" : "grey.400",
                    margin: 0,
                    width: '100%',
                    '&:hover': { boxShadow: 4 }
                  }}
                >
                  <Brightness7 sx={{ fontSize: '2rem', color: mode === "light" ? "primary.light" : "grey.400" }} />
                </ColorBox>
                <Typography variant="body2" fontSize={14} textAlign={'center'} color="textSecondary">
                  Sáng
                </Typography>
              </Stack>
              <Stack sx={{ flex: 1 }}>
                <ColorBox
                  onClick={() => handleChangeMode('dark')}
                  sx={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: mode === "dark" ? "primary.light" : "grey.400",
                    margin: 0,
                    width: '100%',
                    '&:hover': { boxShadow: 4 }
                  }}
                >
                  <DarkMode sx={{ fontSize: '2rem', color: mode === "dark" ? "primary.light" : "grey.400" }} />
                </ColorBox>
                <Typography variant="body2" textAlign={'center'} fontSize={14} color="textSecondary">
                  Tối
                </Typography>
              </Stack>
              <Stack sx={{ flex: 1 }}>
                <ColorBox
                  onClick={() => handleChangeMode('system')}
                  sx={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: mode === 'system' ? 'primary.light' : 'grey.400',
                    margin: 0,
                    width: '100%',
                    '&:hover': { boxShadow: 4 }
                  }}
                >
                  <DesktopMac sx={{ fontSize: '2rem', color: mode === 'system' ? 'primary.light' : 'grey.400' }} />
                </ColorBox>
                <Typography variant="body2" textAlign={'center'} fontSize={14} color="textSecondary">
                  Hệ thống
                </Typography>
              </Stack>
            </Stack>
            <Divider sx={{ my: 2, borderColor: alpha(theme.palette.primary.main, 0.3) }} />
            <Typography variant="body1" fontSize={15} color="textPrimary" sx={{ mb: 1 }}>Màu sắc chính</Typography>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1} sx={{}}>
              <ColorBox
                onClick={() => handleChangeThemeColors('primary')}
                sx={{
                  ml: 0,
                  backgroundColor: '#1976d2',
                  ...(themeColor === 'primary' && !userThemeColor ? { boxShadow: 9 } : { '&:hover': { boxShadow: 4 } })
                }}
              >
                {themeColor === 'primary' && !userThemeColor ? <Check sx={{ fontSize: '1.25rem' }} /> : null}
              </ColorBox>
              <ColorBox
                onClick={() => handleChangeThemeColors('secondary')}
                sx={{
                  backgroundColor: 'secondary.main',
                  ...(themeColor === 'secondary' && !userThemeColor ? { boxShadow: 9 } : { '&:hover': { boxShadow: 4 } })
                }}
              >
                {themeColor === 'secondary' && !userThemeColor ? <Check sx={{ fontSize: '1.25rem' }} /> : null}
              </ColorBox>
              <ColorBox
                onClick={() => handleChangeThemeColors('success')}
                sx={{
                  backgroundColor: 'success.main',
                  ...(themeColor === 'success' && !userThemeColor ? { boxShadow: 9 } : { '&:hover': { boxShadow: 4 } })
                }}
              >
                {themeColor === 'success' && !userThemeColor ? <Check sx={{ fontSize: '1.25rem' }} /> : null}
              </ColorBox>
              <ColorBox
                onClick={() => handleChangeThemeColors('error')}
                sx={{
                  backgroundColor: 'error.main',
                  ...(themeColor === 'error' && !userThemeColor ? { boxShadow: 9 } : { '&:hover': { boxShadow: 4 } })
                }}
              >
                {themeColor === 'error' && !userThemeColor ? <Check sx={{ fontSize: '1.25rem' }} /> : null}
              </ColorBox>
              <ColorBox
                onClick={() => handleChangeThemeColors('warning')}
                sx={{
                  backgroundColor: 'warning.main',
                  ...(themeColor === 'warning' && !userThemeColor ? { boxShadow: 9 } : { '&:hover': { boxShadow: 4 } })
                }}
              >
                {themeColor === 'warning' && !userThemeColor ? <Check sx={{ fontSize: '1.25rem' }} /> : null}
              </ColorBox>
              <ColorBox
                onClick={() => handleChangeThemeColors('info')}
                sx={{
                  mr: 0,
                  backgroundColor: 'info.main',
                  ...(themeColor === 'info' && !userThemeColor ? { boxShadow: 9 } : { '&:hover': { boxShadow: 4 } })
                }}
              >
                {themeColor === 'info' && !userThemeColor ? <Check sx={{ fontSize: '1.25rem' }} /> : null}
              </ColorBox>
              <ColorBox
                onClick={(e) => handleOpenPopover(e, 'userThemeColor')}
                sx={{
                  mr: 0,
                  borderWidth: 2,
                  borderStyle: 'solid',
                  borderColor: !!userThemeColor ? userThemeColor : theme.palette.grey[400],
                  ...(userThemeColor ? { boxShadow: 9 } : { '&:hover': { boxShadow: 4 } })
                }}
              >
                <ColorLens sx={{ fontSize: '2.15rem', color: !!userThemeColor ? userThemeColor : theme.palette.grey[400] }} />
              </ColorBox>
            </Stack>
            <Divider sx={{ my: 2, borderColor: alpha(theme.palette.primary.main, 0.3) }} />
            <Stack spacing={2}>
              <Typography variant="body1" fontSize={15} color="textPrimary" sx={{ mb: 1 }}>Sidebar</Typography>
              <Stack direction={"row"} spacing={2} justifyContent={"flex-start"}>
                <BoxSelectColor label={"Màu nền"} keyValue="bgSidebar" onChange={handleOpenPopover} />
                <BoxSelectColor label={"Màu chữ"} keyValue="txtSidebar" onChange={handleOpenPopover} />
                <BoxSelectColor label={"Chữ active"} keyValue="txtActiveSidebar" onChange={handleOpenPopover} />
              </Stack>
              <Divider sx={{ my: 2, borderColor: alpha(theme.palette.primary.main, 0.3) }} />
              <Typography variant="body1" fontSize={15} color="textPrimary" sx={{ mb: 1 }}>Header</Typography>
              <Stack direction={"row"} spacing={2} justifyContent={"flex-start"}>
                <BoxSelectColor label={"Màu nền"} keyValue="bgHeader" onChange={handleOpenPopover} />
                <BoxSelectColor label={"Màu chữ"} keyValue="txtHeader" onChange={handleOpenPopover} />
                <BoxSelectColor label={"Chữ active"} keyValue="txtActiveHeader" onChange={handleOpenPopover} />
              </Stack>
              <Divider sx={{ my: 2, borderColor: alpha(theme.palette.primary.main, 0.3) }} />
              <Typography variant="body1" fontSize={15} color="textPrimary" sx={{ mb: 1 }}>Nội dung</Typography>
              <Stack direction={"row"} justifyContent={"flex-start"} flexWrap={'wrap'} sx={{ gap: 2 }}>
                <BoxSelectColor label={"Màu nền"} keyValue="bgContent" onChange={handleOpenPopover} />
                <BoxSelectColor label={"Màu tiêu đề"} keyValue="txtTitle" onChange={handleOpenPopover} />
                <BoxSelectColor label={"Màu chữ"} keyValue="txtContent" onChange={handleOpenPopover} />
                <BoxSelectColor label={"Màu Button"} keyValue="btnPrimary" onChange={handleOpenPopover} />
                <BoxSelectColor label={"Màu link"} keyValue="link" onChange={handleOpenPopover} />
                <BoxSelectColor label={"Màu hover"} keyValue="hover" onChange={handleOpenPopover} />
              </Stack>
            </Stack>
          </PerfectScrollbar>
        </Box>
        <Popover
          open={openPopover}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          {activeKey && (
            <Box sx={{ pt: 2, px: 2, width: 220 }}>
              <HexColorPicker
                color={activeKey === 'userThemeColor' && userThemeColor ? userThemeColor : theme.palette.custom[activeKey]}
                onChange={(color) => handleChangeCustomColor(activeKey, color)}
              />
              <TextField
                fullWidth
                size="small"
                label="Mã màu"
                variant="outlined"
                value={activeKey === 'userThemeColor' ? userThemeColor ?? '#000000' : theme.palette.custom[activeKey] ?? ''}
                onChange={(e) => handleChangeCustomColor(activeKey, e.target.value)}
                error={!/^#[0-9A-Fa-f]{6}$/.test(activeKey === 'userThemeColor' ? userThemeColor || '#000000' : theme.palette.custom[activeKey])}
                helperText={
                  !/^#[0-9A-Fa-f]{6}$/.test(activeKey === 'userThemeColor' ? userThemeColor || '#000000' : theme.palette.custom[activeKey])
                    ? 'Mã màu phải đúng định dạng #RRGGBB'
                    : ' '
                }
                sx={{
                  mt: 2,
                  input: {
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                  },
                }}
              />
            </Box>
          )}
        </Popover>
      </Box>
    </Drawer>
  );
};

type BoxSelectColorProps = {
  label: string;
  keyValue: keyof ReturnType<typeof DefaultPalette>['custom'];
  onChange: (event: React.MouseEvent<HTMLElement>, key: keyof ReturnType<typeof DefaultPalette>['custom']) => void;
}
const BoxSelectColor: React.FC<BoxSelectColorProps> = ({ label, keyValue, onChange }) => {
  return (
    <Box
      key={keyValue}
      sx={{
        borderRadius: 1,
        cursor: 'pointer',
      }}
      onClick={(e) => onChange(e, `${keyValue}`)}
    >
      <ColorBox
        onClick={() => { }}
        sx={{
          width: '80px',
          height: '30px',
          mr: 0,
          ml: 0,
          backgroundColor: `custom.${keyValue}`,
          flex: 1,
          mb: 0.5,
        }}
      />
      <Typography variant="body2" color="textSecondary">{label}</Typography>
    </Box>
  )
}

export default SettingsSidebar;
