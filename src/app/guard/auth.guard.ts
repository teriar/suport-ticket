import { CanActivateFn ,Router} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { map } from 'rxjs/operators';
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }


   return authService.validateToken().pipe(
    map(valid => {
      if (valid) {
        return true;
      } else {
        authService.clearToken();
        router.navigate(['/login']);
        return false;
      }
    })
  );

};
