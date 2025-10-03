import { AbstractControl, ValidationErrors } from '@angular/forms';

export function nickValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value && /^[0-9]+$/.test(value)) {
    return { onlyNumbers: true }; // error si es solo números
  }
  return null;
}