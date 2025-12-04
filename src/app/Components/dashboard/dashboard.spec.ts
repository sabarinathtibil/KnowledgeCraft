import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';
import { BadgeService } from '../../Services/badge-service';
import { QuestService } from '../../Services/quest-service';
import { LessonService } from '../../Services/lesson-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

describe('Dashboard Component', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let badgeService: jasmine.SpyObj<BadgeService>;
  let questService: jasmine.SpyObj<QuestService>;
  let lessonService: jasmine.SpyObj<LessonService>;
  let router: jasmine.SpyObj<Router>;

  const mockBadges = [
    { uuid: 'user1', bid: 'b1', name: 'Badge 1', status: 'Active', info: 'Info 1', date: '2025-01-01' },
    { uuid: 'user1', bid: 'b2', name: 'Badge 2', status: 'Active', info: 'Info 2', date: '2025-01-02' }
  ];

  const mockQuests = [
    { bid: 'b1', qid: 'q1', qname: 'Quest 1', uuid: 'user1' },
    { bid: 'b1', qid: 'q2', qname: 'Quest 2', uuid: 'user1' }
  ];

  const mockLessons = [
    { qid: 'q1', lid: 'l1', lname: 'Lesson 1', status: 'Created', date: '2025-01-01', link: 'http://example.com' }
  ];

  beforeEach(async () => {
    const badgeSpy = jasmine.createSpyObj('BadgeService', ['getBadgedata']);
    const questSpy = jasmine.createSpyObj('QuestService', ['getQuest']);
    const lessonSpy = jasmine.createSpyObj('LessonService', ['getLesson']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [Dashboard, CommonModule],
      providers: [
        { provide: BadgeService, useValue: badgeSpy },
        { provide: QuestService, useValue: questSpy },
        { provide: LessonService, useValue: lessonSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    badgeService = TestBed.inject(BadgeService) as jasmine.SpyObj<BadgeService>;
    questService = TestBed.inject(QuestService) as jasmine.SpyObj<QuestService>;
    lessonService = TestBed.inject(LessonService) as jasmine.SpyObj<LessonService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load badges and calculate count', () => {
      const userInfo = { id: 'user1' };
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(userInfo));
      badgeService.getBadgedata.and.returnValue(of(mockBadges));
      questService.getQuest.and.returnValue(of([]));
      lessonService.getLesson.and.returnValue(of([]));

      component.ngOnInit();

      expect(component.badgeCount).toBe(2);
      expect(component.recentBadges.length).toBeGreaterThan(0);
    });

    it('should load quests', () => {
      const userInfo = { id: 'user1' };
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(userInfo));
      badgeService.getBadgedata.and.returnValue(of(mockBadges));
      questService.getQuest.and.returnValue(of(mockQuests));
      lessonService.getLesson.and.returnValue(of([]));

      component.ngOnInit();

      expect(component.questCount).toBe(2);
    });

    it('should load lessons', () => {
      const userInfo = { id: 'user1' };
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(userInfo));
      badgeService.getBadgedata.and.returnValue(of(mockBadges));
      questService.getQuest.and.returnValue(of([]));
      lessonService.getLesson.and.returnValue(of(mockLessons));

      component.ngOnInit();

      expect(component.lessonCount).toBe(1);
    });

    it('should set loading to false after data load', (done) => {
      const userInfo = { id: 'user1' };
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(userInfo));
      badgeService.getBadgedata.and.returnValue(of(mockBadges));
      questService.getQuest.and.returnValue(of([]));
      lessonService.getLesson.and.returnValue(of([]));

      component.ngOnInit();

      setTimeout(() => {
        expect(component.loading).toBe(false);
        done();
      }, 100);
    });
  });

  describe('Navigation', () => {
    it('should navigate to badge on openBadge', () => {
      const badge = mockBadges[0];
      component.openBadge(badge);

      expect(router.navigate).toHaveBeenCalledWith(['/home/badge'], { queryParams: { bid: badge.bid } });
    });

    it('should navigate to quest on openQuest', () => {
      const quest = mockQuests[0];
      component.openQuest(quest);

      expect(router.navigate).toHaveBeenCalledWith(['/home/quests'], { queryParams: { qid: quest.qid } });
    });

    it('should navigate to lesson on openLesson', () => {
      const lesson = mockLessons[0];
      component.openLesson(lesson);

      expect(router.navigate).toHaveBeenCalledWith(['/home/lessons'], { queryParams: { qid: lesson.qid } });
    });
  });
});
