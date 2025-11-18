export type TSeverity = 'info' | 'warning' | 'error' | 'success' 

export interface IAction {
  text: string;
  handler: () => void;
}
  
export interface IModalState {
  open: boolean;
  severity: TSeverity;
  title: string;
  message: string;
  actions: IAction[];
}

export interface AlertModalContextType {
  showAlert: (severity: TSeverity, title: string, message: string, actions?: IAction[]) => void;
}