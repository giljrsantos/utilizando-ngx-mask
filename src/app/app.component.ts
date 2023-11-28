import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AppValidators } from './validator/app.validators';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  form: FormGroup;

  get cpf() {
    return this.form.get('cpf')!;
  }

  get telefone() {
    return this.form.get('telefone')!;
  }

  get ip() {
    return this.form.get('ip')!;
  }

  get data() {
    return this.form.get('data')!;
  }
  get renavam() {
    return this.form.get('renavam')!;
  }
  get placa() {
    return this.form.get('placa')!;
  }
  get descricao() {
    return this.form.get('descricao')!;
  }

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.nonNullable.group({
      cpf: ['', [Validators.required, AppValidators.isCPF]],
      telefone: ['', [Validators.required]],
      ip: ['', [Validators.required]],
      data: [
        '',
        [
          Validators.required,
          //AppValidators.minDate(
          //  new Date('2023-11-01T00:00:00.000-0300'),
          //),
        ],
      ],
      placa: ['', [Validators.required]],
      renavam: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
    });
  }
}
