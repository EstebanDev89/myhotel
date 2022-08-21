import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent implements OnInit {

  // TODO put in service observable
  colors = [ "#00FFFF", "#000000", "#0000FF", "#FF00FF", "#808080", "#008000", "#00FF00", "#800000", "#000080", "#808000", "#800080", "#FF0000", "#C0C0C0", "#008080", "#FFFFFF", "#FFFF00" ];
  created = this.datePipe.transform(new Date(), 'M-d-yy, h:mm a');


  crudForm = new FormGroup({
    name: new FormControl("", Validators.required),
    colors: new FormControl("", Validators.required),
    color: new FormControl("", Validators.required),
  });

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void { }

  onSubmit() {

    if (!this.crudForm.valid) return;
    console.log(this.crudForm.value);
  }
}
