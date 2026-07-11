import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public id: any,
    private fb: FormBuilder,
    private service: TasksService,
    public dialog: MatDialogRef<AddTaskComponent>,
    public matDialog: MatDialog,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
  ) {}

  users: any = [
    { name: 'Moahmed', id: '6a4428bae3c69d28b95eb054' },
    { name: 'Ali', id: '6a4428bae3c69d28b95eb054' },
    { name: 'Ahmed', id: '6a4428bae3c69d28b95eb054' },
    { name: 'Zain', id: '6a4428bae3c69d28b95eb054' },
  ];

  newTaskForm!: FormGroup;

  imgPath: string = '';

  selectImageHandler(event: any) {
    console.log(event.target.files[0]);
    this.imgPath = event.target.value;

    this.newTaskForm.get('image')?.setValue(event.target.files[0]);
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {

    const date = new Date(this.data?.deadline);

    this.imgPath = this.data?.image ;

    this.newTaskForm = this.fb.group({
      title: [this.data?.title   || ``, Validators.required],
      userId: [this.data?.userId._id || ``, Validators.required],
      image: [this.data?.image || ``, Validators.required],
      description: [this.data?.description || ``, Validators.required],
      deadline: [
          this.data ?  new Date(this.data?.deadline)?.toISOString() : '', 
        Validators.required,
      ],
    });

  }

  createTask() {
    const formData = new FormData();

    formData.append('title', this.newTaskForm.value['title']);
    formData.append('userId', this.newTaskForm.value['userId']);
    formData.append('image', this.newTaskForm.value['image']);
    formData.append('description', this.newTaskForm.value['description']);
    formData.append('deadline', this.newTaskForm.value['deadline']);

    this.spinner.show();

    this.service.createTask(formData).subscribe({
      next: () => {
        this.spinner.hide();
        this.toaster.success('Task Added Successfully');
        this.dialog.close(true);
      },
      error: (err) => {
        this.spinner.hide();
        this.toaster.error(err?.error?.massage);
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }

  updateTask(){
    this.spinner.show();
    let model: any  = this.prepareFromData();

    console.log(model)
    this.service.updateTask(this.data._id,model ).subscribe({
      next : ()=>{
        this.toaster.success(`Task Was Updated`);
        this.dialog.close(true);
      },
      error : (err)=>{
        this.toaster.error(`something error please try again!`)
      },
      complete : ()=>{
        this.spinner.hide()
      }
    })
  }

  prepareFromData(){

    let formData = new FormData();

    Object.entries(this.newTaskForm.value).forEach(([key , value] : any)=>{
      formData.append(key , value);
    })

    return formData;
  }

}
