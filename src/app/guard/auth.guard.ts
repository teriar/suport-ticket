import { CanActivateFn ,Router} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);


    return authService.validateToken().pipe(
    map((isValid) => {
      if (isValid) {
        return true; 
      } else {
        router.navigate(['/login']); 
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/login']); 
      return of(false);
    })
  );
};
  


