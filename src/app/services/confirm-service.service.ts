import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmServiceService {

  constructor(private dialog:MatDialog) { }
  openConfirmDialoge(){
    return this.dialog.open(ConfirmDialogComponent,{
      width:'390px',
      disableClose: true,
      position: {top:'10px'}
    });
  }
}
