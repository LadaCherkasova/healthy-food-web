import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'filter-shield',
  templateUrl: './filter-shield.component.html',
  styleUrls: ['./filter-shield.component.scss']
})
export class FilterShieldComponent {
  @Input()
  color: 'red' | 'blue' | 'white';

  @Input()
  image?: 'leaf';

  @Input()
  text?: string;

  @Input()
  hideCrosses?: boolean;

  @Output()
  clicked = new EventEmitter<void>();
}
