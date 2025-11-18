import React, { createContext, useContext, useCallback, useMemo, useState, ReactNode } from 'react';
import {
  Modal,
  Box,
  Alert,
  AlertTitle,
  Button,
  Fade,
} from '@mui/material';
import { AlertModalContextType, IModalState, TSeverity } from '../interfaces/alert';

const defaultContextValue: AlertModalContextType = {
  showAlert: () => {},
};

// Tạo context
const AlertModalContext = createContext<AlertModalContextType>(defaultContextValue);

// Provider với tối ưu hiệu suất
export const AlertModalProvider = ({ children } : { children?: ReactNode }) => {
  const [modalState, setModalState] = useState<IModalState>({
    open: false,
    severity: 'info',
    title: '',
    message: '',
    actions: [], // [{ text: string, handler: () => void }]
  });

  // Memoize showAlert để tránh tạo hàm mới mỗi lần render
  const showAlert = useCallback((severity: TSeverity, title: string, message: string, actions: any[] = []) => {
    if (!message) return;
    setModalState({
      open: true,
      severity,
      title,
      message,
      actions: Array.isArray(actions) ? actions : [],
    });
  }, []);

  // Memoize hideAlert
  const hideAlert = useCallback(() => {
    setModalState(prev => ({ ...prev, open: false }));
  }, []);

  // Xử lý action với memoization
  const handleAction = useCallback((handler: VoidFunction) => {
    handler();
    hideAlert();
  }, [hideAlert]);

  // Memoize style để tránh tính toán lại
  const modalStyle = useMemo(() => ({
    maxWidth: 400,
    width: '100%',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
    mx: 2,
  }), []);

  // if (!modalState.message) return null;

  return (
    <AlertModalContext.Provider value={{ showAlert }}>
      {children}
      <Modal
        open={modalState.open}
        onClose={hideAlert}
        closeAfterTransition
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        slotProps={{ backdrop: { timeout: 300 } }} // Tối ưu transition
      >
        <Fade in={modalState.open} timeout={300}>
          <Box sx={modalStyle}>
            <Alert severity={modalState.severity} sx={{ mb: 2 }}>
              <AlertTitle>{modalState.title}</AlertTitle>
              <Box sx={{ whiteSpace: 'pre-line' }}>{modalState.message}</Box>
            </Alert>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button
                onClick={hideAlert}
                variant="outlined"
                color="inherit"
                size="small" // Giảm kích thước cho hiệu suất giao diện
              >
                Đóng
              </Button>
              {modalState.actions.map((action, index) => (
                <Button
                  key={index} // Key đơn giản vì actions là mảng tĩnh
                  onClick={() => handleAction(action.handler)}
                  variant="contained"
                  color={modalState.severity === 'error' ? 'error' : 'primary'}
                  size="small"
                >
                  {action.text}
                </Button>
              ))}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </AlertModalContext.Provider>
  );
};

// Hook tối ưu
export const useAlertModal = (): AlertModalContextType => {
  const context = useContext(AlertModalContext);
  if (!context) throw new Error('useAlertModal must be used within AlertModalProvider');
  return context;
};
