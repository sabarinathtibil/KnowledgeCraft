import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Register } from './register';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('Register Component', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register, FormsModule, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty form fields initially', () => {
    expect(component.userform.get('name')?.value).toBe('');
    expect(component.userform.get('email')?.value).toBe('');
    expect(component.userform.get('password')?.value).toBe('');
  });

  it('should render registration form', () => {
    const form = fixture.nativeElement.querySelector('form');
    expect(form).toBeTruthy();
  });

  it('should have name, email and password inputs', () => {
    const inputs = fixture.nativeElement.querySelectorAll('input');
    expect(inputs.length).toBeGreaterThanOrEqual(3);
  });

  it('should have submit button', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
  });
});
