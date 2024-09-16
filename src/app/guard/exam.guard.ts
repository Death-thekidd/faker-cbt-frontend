import { CanActivateFn, Router } from '@angular/router';

export const examGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const examSession = localStorage.getItem('questions');
  if (examSession) {
    // logged in so return true
    return true;
  }

  // not logged in so redirect to login page with the return url
  router.navigate(['/student/home']);
  return false;
};
