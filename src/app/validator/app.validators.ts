import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class AppValidators {
  static isCPF(
    control: AbstractControl,
  ): ValidationErrors | null {
    const cpf = control.value.replace(/\D/g, '');

    // Verifica se o CPF tem 11 digitos
    if (cpf.length !== 11) {
      return { isCPF: true };
    }
    // Verifica se todos os digitos são
    // iguais (evitar CPFs 111.111.111-11)
    if (/^(\d)\1+$/.test(cpf)) {
      return { isCPF: true };
    }

    // Calcula os digitos verificadores
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.charAt(9))) {
      return { isCPF: true };
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.charAt(10))) {
      return { isCPF: true };
    }

    return null;
  }

  static minDate(min: Date): ValidatorFn {
    return (
      control: AbstractControl,
    ): ValidationErrors | null => {
      const [dd, mm, yyyy] = control.value
        .split('/')
        .map((a: string) => a || '0')
        .map(Number);

      const date = new Date(yyyy, mm - 1, dd);
      if (date.getTime() > min.getTime()) {
        return null;
      }

      return { minDate: min };
    };
  }
}
