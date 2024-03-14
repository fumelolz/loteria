
export class ToastModel {
  title: string | null = null;
  description: string | null = null;
  type: 'error' | 'success' | 'info' | 'warning' = 'success';
  selfClosing?: boolean = false;
  errorList: any[] = [];
}
