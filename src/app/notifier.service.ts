import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackbar : MatSnackBar) { }
  showNotification(message:string, action:string){
    this.snackbar.open(message,action,{
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition:'top'
    })

  }
}
