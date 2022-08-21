import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Foo } from 'src/app/models/Foo.model';
import { FooCrudService } from 'src/app/services/foo-crud/foo-crud.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'color', 'created', 'actions'];

  foos$: Observable<Foo[]> = this.fooCrudService.getAll();

  constructor(private fooCrudService: FooCrudService) { }

  ngOnInit(): void {
  }

}
