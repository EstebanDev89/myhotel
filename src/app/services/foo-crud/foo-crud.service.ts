import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Foo } from 'src/app/models/Foo.model';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root',
})
export class FooCrudService {
  private colors: string[] = [
    '#00FFFF',
    '#000000',
    '#0000FF',
    '#FF00FF',
    '#808080',
    '#008000',
    '#00FF00',
    '#800000',
    '#000080',
    '#808000',
    '#800080',
    '#FF0000',
    '#C0C0C0',
    '#008080',
    '#FFFFFF',
    '#FFFF00',
  ];
  private list: Foo[] = [
    {
      id: 1,
      name: 'Walter Whites',
      color: 'red',
      colors: ['#FFFFFF', '#FF0000'],
      created: '8-21-22, 2:52 PM',
    },
    {
      id: 2,
      name: 'Jesse Pinkman',
      color: 'yellow',
      colors: ['#FF00FF', '#FF0000'],
      created: '8-21-22, 2:55 PM',
    },
    {
      id: 3,
      name: 'Saul Goodman',
      color: 'yellow',
      colors: ['#FFFF00', '#0000FF'],
      created: '8-21-22, 2:55 PM',
    },
    {
      id: 4,
      name: 'Kim Wexler',
      color: 'green',
      colors: ['#008000', '#FF00FF', '#FFFFFF'],
      created: '8-21-22, 2:55 PM',
    },
  ];
  private idCounter = 4;

  constructor(private datePipe: DatePipe) {}

  private validate(foo: Foo) {
    if (!foo.name || foo.name.trim() === '') return false;
    if (!foo.colors) return false;
    return true;
  }

  private updateList(changes: Foo) {
    this.list = this.list.map((element) => {
      const id = element.id;
      const created = element.created;
      if (element.id === changes.id) {
        return { ...element, ...changes, id, created };
      }
      return element;
    });
  }

  getColors(): Observable<string[]> {
    return of(this.colors);
  }

  getAll(): Observable<Foo[]> {
    return of(this.list);
  }

  add(newest: Foo): Observable<boolean> {
    const created = <string>this.datePipe.transform(new Date(), 'M-d-yy, h:mm a');
    if (this.validate(newest)) {
      const id = ++this.idCounter;
      this.list.push({ ...newest, id , created});
      return of(true);
    }
    return of(false);
  }

  update(changes: Foo): Observable<boolean> {
    const index = this.list.findIndex((ele) => ele.id === changes.id);
    if (index !== -1 && this.validate(changes)) {
      this.updateList(changes);
      return of(true);
    }
    return of(false);
  }

  delete(id: number): Observable<boolean> {
    const index = this.list.findIndex((ele) => ele.id === id);
    if (index === -1) return of(false);
    this.list = this.list.filter((ele) => ele.id !== id);
    return of(true);
  }

  findById(id: number): Observable<Foo | undefined> {
    return of(
      this.list.find((element: Foo) => {
        element.id === id;
      })
    );
  }

  findByQuery(query: string): Observable<Foo[]> {
    return of(
      this.list.filter((element: Foo) => {
        element.id.toString().includes(query) ||
          element.color.includes(query) ||
          element.colors.find((c: string) => c.includes(query)) ||
          element.created.includes(query) ||
          element.name.includes(query);
      })
    );
  }
}
