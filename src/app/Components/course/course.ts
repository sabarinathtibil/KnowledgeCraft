import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../Services/course-service';

@Component({
  selector: 'app-course',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './course.html',
  styleUrl: './course.css',
})
export class Course implements OnInit{
  data:any[]=[];
  ngOnInit(): void {
    
    // this.data=localStorage.getItem('Course')||[]
  }


// courseForm: FormGroup;

  // constructor(private fb: FormBuilder) {
  //   this.courseForm = this.fb.group({
  //     title: ['', Validators.required],
  //     subtitle: [''],
  //     modules: ['', Validators.required],        // you can change this later to FormArray if needed
  //     createdBy: ['', Validators.required],
  //     createdDate: ['', Validators.required],    // type="date" in HTML
  //   });
  // }

  // onSubmit() {
  //   if (this.courseForm.invalid) {
  //     this.courseForm.markAllAsTouched();
  //     return;
  //   }

  //   console.log('Form Value:', this.courseForm.value);
  //   // here you can call API or service
  // }
  date=new Date()
  setstatus:boolean=false;

  userForm:FormGroup;
  constructor(private fb:FormBuilder,private courseservice:CourseService){
    this.userForm=this.fb.group({
      id:[Date.now()],
      title:['',Validators.required],
      subtitle:['',Validators.required],
      modules:['',Validators.required],
      createdBy:['',Validators.required],
      createdAt:[this.date.toLocaleDateString()]
    })
  }
  onsubmit(){
    console.log(this.userForm.value);
    this.courseservice.setCourse(this.userForm.value)
  }

  toogle(){
    this.setstatus=!this.setstatus
  }
}
