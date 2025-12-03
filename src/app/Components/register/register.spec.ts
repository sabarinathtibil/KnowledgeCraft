import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/Shared-Components/page-not-found/page-not-found.spec.ts
import { PageNotFound } from './page-not-found';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNotFound);
========
import { Register } from './register';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Register);
>>>>>>>> feature/shashank:src/app/Components/register/register.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
