import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { NotifierService } from '../notifier.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  //radiobuttonlist
  productTypeList =['Fresh','Used','Refurnished'];

  //formcreation
  productForm !: FormGroup;

  //actionbtn initial value
  actionBtn :string ='Save';

  //injecting values
  constructor(private formBuilder: FormBuilder, 
    private api : ApiService,
    private notifierServices: NotifierService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>
    ) { }
    
  ngOnInit(): void {
    //validation
    this.productForm = this.formBuilder.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      type:['',Validators.required],
      price:['',Validators.required],
      comment:['',Validators.required],
      date:['',Validators.required]
      });
      //console.log(this.editData);
      if(this.editData){
        this.actionBtn='Update';
        this.productForm.controls['productName'].setValue(this.editData.productName);
        this.productForm.controls['category'].setValue(this.editData.category);
        this.productForm.controls['type'].setValue(this.editData.type);
        this.productForm.controls['price'].setValue(this.editData.price);
        this.productForm.controls['comment'].setValue(this.editData.comment);
        this.productForm.controls['date'].setValue(this.editData.date);
      }
  }

  //saving form into json server
  saveForm(){
    if(!this.editData)
    {
      //console.log(this.productForm.value);
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next:(res)=>{
          //alert('Product Added Succesfully');
          this.notifierServices.showNotification('Product Added Succesfully', 'OK');
          this.productForm.reset();
          this.dialogRef.close('save');
          },
          error:()=>{
          alert('Error while adding the product');
          }
        })
      }
    }
    else{
      this.updateData();
    }
  }

  updateData(){
    this.api.putProduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        //alert('Product Updated Successfully');
        this.notifierServices.showNotification('Product Updated Successfully', 'OK');
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert('Error in Updation');
      }
    })
  }

}
