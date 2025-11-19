import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-course',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './course.html',
  styleUrl: './course.css',
})
export class Course {
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

  userForm:FormGroup;
  constructor(private fb:FormBuilder){
    this.userForm=fb.group({
      title:['',Validators.required],
      subtitle:['',Validators.required],
      modules:['',Validators.required],
      createdBy:['',Validators.required],
      createdAt:[Date.now().toLocaleString()]
    })
  }
  onsubmit(){
    console.log(this.userForm.value);
    
  }

}
