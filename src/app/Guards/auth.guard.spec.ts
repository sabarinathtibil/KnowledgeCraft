import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);

    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when user is authenticated', () => {
    // Set user info in localStorage
    const userInfo = { username: 'testuser', uuid: '123' };
    localStorage.setItem('userinfo', JSON.stringify(userInfo));

    const mockRoute = {} as ActivatedRouteSnapshot;
    const mockState = { url: '/home/badge' } as RouterStateSnapshot;

    const result = guard.canActivate(mockRoute, mockState);

    expect(result).toBe(true);
  });

  it('should deny access and redirect to login when user is not authenticated', () => {
    // Spy on router.navigate
    spyOn(router, 'navigate');

    const mockRoute = {} as ActivatedRouteSnapshot;
    const mockState = { url: '/home/badge' } as RouterStateSnapshot;

    const result = guard.canActivate(mockRoute, mockState);

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(
      ['/login'],
      { queryParams: { returnUrl: '/home/badge' } }
    );
  });

  it('should deny access and redirect to login when userinfo is empty string', () => {
    // Set empty string in localStorage
    localStorage.setItem('userinfo', '');

    // Spy on router.navigate
    spyOn(router, 'navigate');

    const mockRoute = {} as ActivatedRouteSnapshot;
    const mockState = { url: '/home/quests' } as RouterStateSnapshot;

    const result = guard.canActivate(mockRoute, mockState);

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(
      ['/login'],
      { queryParams: { returnUrl: '/home/quests' } }
    );
  });

  it('should pass returnUrl as query parameter when redirecting', () => {
    spyOn(router, 'navigate');

    const mockRoute = {} as ActivatedRouteSnapshot;
    const mockState = { url: '/home/lessons' } as RouterStateSnapshot;

    guard.canActivate(mockRoute, mockState);

    expect(router.navigate).toHaveBeenCalledWith(
      ['/login'],
      { queryParams: { returnUrl: '/home/lessons' } }
    );
  });

  it('should allow access when user info contains valid JSON', () => {
    const userInfo = {
      username: 'john_doe',
      uuid: 'abc-123-def',
      email: 'john@example.com'
    };
    localStorage.setItem('userinfo', JSON.stringify(userInfo));

    const mockRoute = {} as ActivatedRouteSnapshot;
    const mockState = { url: '/home/dashboard' } as RouterStateSnapshot;

    const result = guard.canActivate(mockRoute, mockState);

    expect(result).toBe(true);
  });
});
