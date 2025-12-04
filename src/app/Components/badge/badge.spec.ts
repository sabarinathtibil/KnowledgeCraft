import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Badge } from './badge';
import { BadgeService } from '../../Services/badge-service';
import { QuestService } from '../../Services/quest-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

describe('Badge Component', () => {
  let component: Badge;
  let fixture: ComponentFixture<Badge>;
  let badgeService: jasmine.SpyObj<BadgeService>;
  let questService: jasmine.SpyObj<QuestService>;
  let router: jasmine.SpyObj<Router>;

  const mockBadges = [
    { uuid: 'user1', bid: 'b1', name: 'Badge 1', status: 'Active', info: 'Info 1', date: '2025-01-01' },
    { uuid: 'user1', bid: 'b2', name: 'Badge 2', status: 'Active', info: 'Info 2', date: '2025-01-02' }
  ];

  const mockQuests = [
    { bid: 'b1', qid: 'q1', qname: 'Quest 1', uuid: 'user1' },
    { bid: 'b1', qid: 'q2', qname: 'Quest 2', uuid: 'user1' }
  ];

  beforeEach(async () => {
    const badgeSpy = jasmine.createSpyObj('BadgeService', ['getBadgedata', 'postData']);
    const questSpy = jasmine.createSpyObj('QuestService', ['getQuest']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [Badge, FormsModule, CommonModule],
      providers: [
        { provide: BadgeService, useValue: badgeSpy },
        { provide: QuestService, useValue: questSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    badgeService = TestBed.inject(BadgeService) as jasmine.SpyObj<BadgeService>;
    questService = TestBed.inject(QuestService) as jasmine.SpyObj<QuestService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(Badge);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load badges and filter by current user', () => {
      const userInfo = { id: 'user1' };
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(userInfo));
      badgeService.getBadgedata.and.returnValue(of(mockBadges));

      component.ngOnInit();

      expect(badgeService.getBadgedata).toHaveBeenCalled();
      expect(component.badges.length).toBe(2);
    });

    it('should handle empty badges', () => {
      const userInfo = { id: 'user1' };
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(userInfo));
      badgeService.getBadgedata.and.returnValue(of([]));

      component.ngOnInit();

      expect(component.badges.length).toBe(0);
    });
  });

  describe('viewBadge', () => {
    it('should set selected badge', () => {
      questService.getQuest.and.returnValue(of(mockQuests));
      const badge = mockBadges[0];

      component.viewBadge(badge);

      expect(component.selectedBadge).toEqual(badge);
      expect(questService.getQuest).toHaveBeenCalled();
    });
  });

  // describe('editBadge', () => {
  //   it('should populate form with badge data', () => {
  //     const badge = mockBadges[0];
  //     // component.editBadge(badge);

  //     expect(component.name).toBe(badge.name);
  //     expect(component.info).toBe(badge.info);
  //   });
  // });

  // describe('clearFilters', () => {
  //   it('should clear search terms', () => {
  //     component.searchTerm = 'search';
  //     component.tagFilter = 'tag';

  //     // component.clearFilters();

  //     expect(component.searchTerm).toBe('');
  //     expect(component.tagFilter).toBe('');
  //   });
  // });
});
