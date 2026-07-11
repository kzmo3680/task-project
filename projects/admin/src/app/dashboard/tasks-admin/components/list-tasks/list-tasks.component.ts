import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from '../../services/tasks.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
export interface PeriodicElement {
  title: string;
  user: string;
  deadLineDate: string;
  status: string;
}


@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadline','status', 'actions'];
  dataSource : any = [];
  tasksFilter!:FormGroup
  users:any = [
    {name:"Moahmed" , id:"6a4428bae3c69d28b95eb054"},
    {name:"Ali" , id:"6a4428bae3c69d28b95eb054"},
    {name:"Ahmed" , id:"6a4428bae3c69d28b95eb054"},
    {name:"Zain" , id:"6a4428bae3c69d28b95eb054"},
  ]

  status:any = [
    {name:"Complete" , id:1},
    {name:"In-Prossing" , id:2},
  ]
    
  constructor(private services : TasksService, private toaster : ToastrService , public dialog : MatDialog , private spinner : NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllTasks();
  }

  createform() {

  }

  getAllTasks() {

      this.spinner.show();

       this.services.getAllTasks().subscribe({
        next : (res : any)=>{
          this.dataSource = this.mappingTasks(res.tasks);
        },
        error : ()=>{
        },
        complete : ()=>{
          this.spinner.hide();
        }
       })
  }

  mappingTasks(data : any[]){

    let newTakss  = data.map((item)=>{
      return {
        ...item,
        user : item.userId.username
      }
    })
    return newTakss ; 
  }



  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result ==  true) {
        this.getAllTasks();
      }
    });
  
      
  }

  updateTask( id: any,element : any)
  {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width:`750px`,
      data : element,
      id 
    });

    

    dialogRef.afterClosed().subscribe(result => {
      if (result ==  true) {
        this.getAllTasks();
      }
    });


  }

  deleteTask(id : string)
  {
    this.spinner.show();
    this.services.deleteTask(id).subscribe({
      next : ()=>{
        this.toaster.success(`Task Deleted Successfully`);
        this.getAllTasks();
        
      },
      error : (err)=>{
        this.toaster.error(err.error.message);
      },
      complete : ()=>{
        this.spinner.hide();
      }
    });
  }

}
