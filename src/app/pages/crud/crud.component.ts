import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent implements OnInit {
  crudForm = new FormGroup({
    firstInput: new FormControl("", Validators.required),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.crudForm.valid) return;
  }
}
