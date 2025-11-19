import { Component } from '@angular/core';
import { Course } from '../course/course';

@Component({
  selector: 'app-landing-page',
  imports: [Course],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {

}
