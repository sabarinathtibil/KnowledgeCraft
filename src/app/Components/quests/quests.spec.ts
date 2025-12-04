import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Quests } from './quests';
import { QuestService } from '../../Services/quest-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('Quests Component', () => {
  let component: Quests;
  let fixture: ComponentFixture<Quests>;
  let questService: jasmine.SpyObj<QuestService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: any;

  const mockQuests = [
    { bid: 'b1', qid: 'q1', qname: 'Quest 1', uuid: 'user1', status: 'Active' },
    { bid: 'b1', qid: 'q2', qname: 'Quest 2', uuid: 'user1', status: 'Active' }
  ];

  beforeEach(async () => {
    const questSpy = jasmine.createSpyObj('QuestService', ['getQuest', 'postQuest']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    activatedRoute = {
      queryParams: of({ bid: 'b1' })
    };

    await TestBed.configureTestingModule({
      imports: [Quests, FormsModule, CommonModule],
      providers: [
        { provide: QuestService, useValue: questSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: HttpClient, useValue: {} }
      ]
    }).compileComponents();

    questService = TestBed.inject(QuestService) as jasmine.SpyObj<QuestService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(Quests);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load quests from query params', () => {
      questService.getQuest.and.returnValue(of(mockQuests));

      component.ngOnInit();

      expect(component.bid).toBe('b1');
      expect(questService.getQuest).toHaveBeenCalled();
    });

    it('should filter quests by badge id', (done) => {
      questService.getQuest.and.returnValue(of(mockQuests));

      component.ngOnInit();

      setTimeout(() => {
        expect(component.questData.length).toBe(2);
        expect(component.questData[0].bid).toBe('b1');
        done();
      }, 100);
    });
  });


  //   it('should create quest with validation', () => {
  //     component.questName = 'New Quest';
  //     component.questLink = 'http://link.com';
  //     component.bid = 'b1';
  //     questService.postQuest.and.returnValue(of({}));

  //     // component.createQuest();

  //     expect(component.questData.length).toBe(1);
  //   });

  //   it('should navigate to lessons after creation', (done) => {
  //     component.questName = 'Quest';
  //     // component. = 'http://link.com';
  //     component.bid = 'b1';
  //     questService.postQuest.and.returnValue(of({ qid: 'q1' }));

  //     component.createQuest();

  //     setTimeout(() => {
  //       expect(router.navigate).toHaveBeenCalled();
  //       done();
  //     }, 100);
  //   });
  // });
});
