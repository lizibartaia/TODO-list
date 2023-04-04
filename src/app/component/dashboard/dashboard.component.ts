import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  taskobj : Task = new Task();
  taskArr : Task[] = []
  addTaskValue: string = ""; //input value
  editTaskValue : string = ""; //edited value


  constructor(private crudService : CrudService) { }

  ngOnInit(): void {
    this.editTaskValue="";
    this.addTaskValue="";
    this.taskobj = new Task();
    this.taskArr = []
    this.getAllTask();
  }
  getAllTask() {
    this.crudService.getAllTask().subscribe(res=>{
      this.taskArr=res
    },err=>{
      console.log(err)
    })
  }

  addTask(){
    this.taskobj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskobj).subscribe(res=>{
      console.log(res)
      this.ngOnInit();
      this.addTaskValue='';
    },err=>{
      console.log(err)
    })

  }

  editTask(){
    this.taskobj.task_name = this.editTaskValue
    this.crudService.editTask(this.taskobj).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      console.log(err)

    })
  }
  deleteTask(etask:Task){
    this.crudService.deleteTask(etask).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      console.log(err)
    })
  }

  call(etask : Task){
    this.taskobj=etask;
    this.editTaskValue = etask.task_name;
  }

}
