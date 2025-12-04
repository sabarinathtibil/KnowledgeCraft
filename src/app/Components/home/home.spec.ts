import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

describe('Home Component', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home, RouterOutlet, RouterLink, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render router-outlet for child routes', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should render sidebar navigation', () => {
    const sidebar = fixture.nativeElement.querySelector('.sidebar');
    expect(sidebar).toBeTruthy();
  });

  it('should render header section', () => {
    const header = fixture.nativeElement.querySelector('.header');
    expect(header).toBeTruthy();
  });

  it('should have navigation links', () => {
    const links = fixture.nativeElement.querySelectorAll('.sidebar a');
    expect(links.length).toBeGreaterThan(0);
  });
});
