import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private readonly _snackBar: MatSnackBar) {}

  show(status: SnackbarStatus) {
    switch (status) {
      case SnackbarStatus.LoadDataSuccess:
        this._snackBar.open('Load dữ liệu thành công', 'Close', {
          duration: 3000,
        });
        break;
      case SnackbarStatus.AddSuccess:
        this._snackBar.open('Thêm thành công', 'Close', {
          duration: 3000,
        });
        break;
      case SnackbarStatus.AddFailed:
        this._snackBar.open('Thêm thất bại!', 'Close', {
          duration: 3000,
        });
        break;
      case SnackbarStatus.UpdateSuccess:
        this._snackBar.open('Cập nhật thành công!', 'Close', {
          duration: 3000,
        });
        break;
      case SnackbarStatus.UpdateFailed:
        this._snackBar.open('Cập nhật thất bại!', 'Close', {
          duration: 3000,
        });
        break;
      case SnackbarStatus.NotFoundInfo:
        this._snackBar.open('Không tìm thấy thông tin', 'Close', {
          duration: 3000,
        });
        break;
      case SnackbarStatus.InternalError:
        this._snackBar.open('Lỗi nội bộ', 'Close', {
          duration: 3000,
        });
        break;
    }
  }
}

export enum SnackbarStatus {
  LoadDataSuccess,
  AddSuccess,
  AddFailed,
  UpdateSuccess,
  UpdateFailed,
  DeleteSuccess,
  DeleteFailed,
  NotFoundInfo,
  InternalError,
}
