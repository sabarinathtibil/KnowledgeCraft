import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Lessons, lessonModel } from './lessons';
import { LessonService } from '../../Services/lesson-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('Lessons Component', () => {
  let component: Lessons;
  let fixture: ComponentFixture<Lessons>;
  let lessonService: jasmine.SpyObj<LessonService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: any;

  const mockLessons: lessonModel[] = [
    { qid: 'q1', lid: 'l1', status: 'Created', lname: 'Lesson 1', date: '2025-01-01', link: 'http://example.com' },
    { qid: 'q1', lid: 'l2', status: 'Created', lname: 'Lesson 2', date: '2025-01-02', link: 'http://example2.com' }
  ];

  beforeEach(async () => {
    const lessonSpy = jasmine.createSpyObj('LessonService', ['getLesson', 'postLesson']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    activatedRoute = {
      queryParams: of({ qid: 'q1' })
    };

    await TestBed.configureTestingModule({
      imports: [Lessons, FormsModule, CommonModule],
      providers: [
        { provide: LessonService, useValue: lessonSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: HttpClient, useValue: {} }
      ]
    }).compileComponents();

    lessonService = TestBed.inject(LessonService) as jasmine.SpyObj<LessonService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(Lessons);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load lessons from query params', () => {
      lessonService.getLesson.and.returnValue(of(mockLessons));

      component.ngOnInit();

      expect(component.qid).toBe('q1');
      expect(lessonService.getLesson).toHaveBeenCalled();
    });

    it('should filter lessons by quest id', (done) => {
      lessonService.getLesson.and.returnValue(of(mockLessons));

      component.ngOnInit();

      setTimeout(() => {
        expect(component.lessonData.length).toBe(2);
        expect(component.lessonData[0].qid).toBe('q1');
        done();
      }, 100);
    });
  });

  describe('addLesson', () => {
    it('should add lesson with validation', () => {
      component.lessonName = 'New Lesson';
      component.lessonLink = 'http://link.com';
      component.qid = 'q1';
      lessonService.postLesson.and.returnValue(of({}));

      component.addLesson();

      expect(component.lessons.length).toBe(1);
      expect(component.lessonData.length).toBe(1);
    });

    it('should alert if lesson name is empty', () => {
      component.lessonName = '';
      component.lessonLink = 'http://link.com';
      spyOn(window, 'alert');

      component.addLesson();

      expect(window.alert).toHaveBeenCalled();
    });

    it('should clear inputs after adding', () => {
      component.lessonName = 'Lesson';
      component.lessonLink = 'http://link.com';
      component.qid = 'q1';
      lessonService.postLesson.and.returnValue(of({}));

      component.addLesson();

      expect(component.lessonName).toBe('');
      expect(component.lessonLink).toBe('');
    });
  });

  describe('addMultipleLessons', () => {
    it('should save all lessons in array', () => {
      component.lessons = mockLessons;
      lessonService.postLesson.and.returnValue(of({}));

      component.addMultipleLessons();

      expect(lessonService.postLesson).toHaveBeenCalledTimes(2);
      expect(component.lessons.length).toBe(0);
    });
  });

  describe('createBadge', () => {
    it('should navigate to badge page', () => {
      component.createBadge();

      expect(router.navigate).toHaveBeenCalledWith(['/home/badge']);
    });
  });
});
