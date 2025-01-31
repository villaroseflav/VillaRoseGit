import {Injectable} from '@angular/core';
 
export interface Toast {
  messageKey: string;
  type: ToastType;

  autoHide?: boolean;
  classNameCss?: string;
  delay?: number;

  leftActionLabel?: string;
  rightActionLabel?: string;
  onLeftAction?: any;
  onRightAction?: any;
}
 
export interface ToastComplexParam {
  leftActionLabel?: string;
  rightActionLabel?: string;
  onLeftAction?: any;
  onRightAction?: any;
}
 
export enum ToastType {
  SIMPLE = 'SIMPLE',
  COMPLEX = 'COMPLEX'
}
 
@Injectable({providedIn: 'root'})
export class ToastService {
  toasts: Toast[] = [];

  showSuccess(messageKey: string, autoHide = true) {
    // this.show({messageKey: messageKey, classNameCss: 'toastSuccess', autoHide, type: ToastType.SIMPLE});
  }

  showInfo(messageKey: string, autoHide = true) {
    this.show({messageKey: messageKey, classNameCss: 'toastInfo', autoHide, type: ToastType.SIMPLE});
  }

  showWarning(messageKey: string, autoHide = false) {
    this.show({messageKey: messageKey, classNameCss: 'toastWarning', autoHide, type: ToastType.SIMPLE});
  }

  showError(messageKey: string, autoHide = false) {
    console.log("TOAST SHOW ERROR"); //todo
    // this.show({messageKey: messageKey, classNameCss: 'toastError', autoHide, type: ToastType.SIMPLE});
    console.log("toasts ", this.toasts.length); //todo
  }

  showComplex(messageKey: string, toastComplexParam: ToastComplexParam) {
    this.show({
      messageKey: messageKey,
      autoHide: false,
      type: ToastType.COMPLEX,
      onLeftAction: toastComplexParam.onLeftAction,
      onRightAction: toastComplexParam.onRightAction,
      leftActionLabel: toastComplexParam.leftActionLabel ?? 'TOAST_COMPLEX_LEFT_ACTION_LABEL',
      rightActionLabel: toastComplexParam.rightActionLabel ?? 'TOAST_COMPLEX_RIGHT_ACTION_LABEL',
    });
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

  private show(toast: Toast) {
    this.toasts.push(toast);
  }
}
 