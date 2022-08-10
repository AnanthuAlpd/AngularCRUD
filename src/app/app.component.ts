import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
//import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { ConfirmServiceService } from './services/confirm-service.service';
import { NotifierService} from './notifier.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CRUD';

  displayedColumns: string[] = ['id', 'productName', 'category', 'date', 'type', 'price', 'comment', 'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private dialog:MatDialog, private api: ApiService,
    private confirm:ConfirmServiceService,
    private notifierServices:NotifierService
    ){}
  
    //
  ngOnInit(): void {
    this.getAllproducts();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
    width: '40%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllproducts();
      }
    });
  }

  getAllproducts(){
    this.api.getProduct()
    .subscribe({
      next:(resp)=>{
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        //console.log();
      },
      error:(err)=>{
        console.log('Error while fetching the data');
      }
    })
  }
  editProduct(row:any){
    this.dialog.open(DialogComponent, {
      width:'40%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllproducts();
      }
    });
  }

  
  deleteProduct(id:number){

    this.confirm.openConfirmDialoge()
    .afterClosed().subscribe(res=>{
      if(res){
        this.api.deleteProduct(id).subscribe({
            next:(res=>{
              this.notifierServices.showNotification('Product Deleted Succesfully', 'OK');
              //alert("Deleted Succesfully");
              this.getAllproducts();
            }),
            error:()=>{
              alert("Error in Deletion");
            }})
      }
    })
    
    // this.api.deleteProduct(id)
    // .subscribe({
    //   next:(res=>{
    //     alert("Deleted Succesfully");
    //     this.getAllproducts();
    //   }),
    //   error:()=>{
    //     alert("Error in Deletion");
    //   }
    // });
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  

  }


