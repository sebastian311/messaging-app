import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    // Redirect if not authenticated
    const router = new Router();
    router.navigate(['/auth']);
    return false;
  }
};
