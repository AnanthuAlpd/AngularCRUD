import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog'


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(private dialogueRef : MatDialogRef<ConfirmDialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialogue(){
    this.dialogueRef.close(false);

  }

  deleteProduct(){
    
  } 
}
