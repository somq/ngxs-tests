import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <div class="counter">
      <div class="total">{{total}}</div>
      <button (click)="increment.emit()">+</button>
      <button (click)="decrement.emit()">-</button>
      <button (click)="reset.emit()">C</button>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
  .counter {
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: 1px solid #9999;
    border-radius: 10px;
    padding: 10px;
  }
  .counter button {
    width: 40px;
    margin: 10px;
  }
  .total {
    margin: 10px;
    font-size: 80px;
  }
  `]
})
export class CounterComponent {
  @Input() total: number;
  @Output() increment = new EventEmitter();
  @Output() decrement = new EventEmitter();
  @Output() reset = new EventEmitter();
}
