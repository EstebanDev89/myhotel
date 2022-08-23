import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FooCrudService } from 'src/app/services/foo-crud/foo-crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, tap, takeUntil } from 'rxjs/operators';
import { combineLatest, race, Subject } from 'rxjs';
import { Foo } from 'src/app/models/Foo.model';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$: Subject<void> = new Subject();

  colors$ = this.fooCrudService.getColors();
  id$ = this.activedRoute.params.pipe(map(({ id }) => +id));
  isDelete$ = this.activedRoute.url.pipe(
    map((segments) => !!segments.find((s) => s.path === 'delete'))
  );
  isEdit$ = combineLatest([this.id$, this.isDelete$]).pipe(
    map(([id, isDelete]) => !!id && !isDelete)

  );
  isAdd$ = this.activedRoute.url.pipe(
    map((segments) => !!segments.find((s) => s.path === 'add'))
  );

  editableFoo$ = combineLatest([this.id$, this.isEdit$]).pipe(
    filter(([id, isEdit]) => isEdit),
    map(([id, isEdit]) => id),
    switchMap((id) => this.fooCrudService.findById(id)),
    tap((foo) => !foo && this.router.navigateByUrl('/foo')),
    tap((foo) => {
      this.crudForm = new FormGroup({
        id: new FormControl(foo?.id),
        created: new FormControl(foo?.created),
        name: new FormControl(foo?.name, Validators.required),
        colors: new FormControl(foo?.colors, Validators.required),
        color: new FormControl(foo?.color, Validators.required),
      });
    })
  );

  deleteFoo$ = combineLatest([this.id$, this.isDelete$]).pipe(
    filter(([id, isDelete]) => isDelete),
    map(([id, isDelete]) => id),
    switchMap((id) => this.fooCrudService.findById(id)),
    tap((foo) => !foo && this.router.navigateByUrl('/foo')),
    tap((foo) => {
      this.crudForm = new FormGroup({
        id: new FormControl(foo?.id),
        created: new FormControl(foo?.created),
        name: new FormControl({ value: foo?.name, disabled: true }),
        colors: new FormControl({ value: foo?.colors, disabled: true }),
        color: new FormControl({ value: foo?.color, disabled: true }),
      });
    })
  );

  crudForm = new FormGroup({
    id: new FormControl(0),
    created: new FormControl(''),
    name: new FormControl('', Validators.required),
    colors: new FormControl([], Validators.required),
    color: new FormControl('', Validators.required),
  });

  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private fooCrudService: FooCrudService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.crudForm.valid) return;

    const added$ = this.isAdd$.pipe(
      filter((assert) => assert),
      switchMap(() => this.fooCrudService.add(<Foo>this.crudForm.value))
    );

    const edited$ = this.isEdit$.pipe(
      filter((assert) => assert),
      switchMap(() => this.fooCrudService.update(<Foo>this.crudForm.value))
    );

    const deleted$ = this.isDelete$.pipe(
      filter((assert) => assert),
      switchMap(() => this.fooCrudService.delete(this.crudForm.value.id))
    );

    race(added$, edited$, deleted$)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((operatioOk) => operatioOk && this.router.navigateByUrl('/foo'))
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
