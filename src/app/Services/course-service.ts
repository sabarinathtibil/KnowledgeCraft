import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
 setCourse(course: any) {
  // Get existing courses
  const existingCourses = JSON.parse(localStorage.getItem('Courses') || '[]');

  // Add new one
  existingCourses.push(course);

  // Save updated array back to localStorage
  localStorage.setItem('Courses', JSON.stringify(existingCourses));
}
}
