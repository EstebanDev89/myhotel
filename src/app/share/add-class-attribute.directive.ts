import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAddClassAttribute]'
})
export class AddClassAttributeDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.classList.add('add');
  }
}
