import {Component, Input} from '@angular/core';
import {PropertyStream} from '../../decorators/property-stream';
import {Observable} from 'rxjs';
import {Memoize} from '../../decorators/memoize';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  @Input()
  public name: string;

  @PropertyStream()
  public readonly name$: Observable<string>;

  constructor() {
    const x = 2;
    const y = 3;
    const result1 = this.multiplyMemoized(2, 3);
    console.log(`multiplied ${x} * ${y} = ${result1}`);
    const result2 = this.multiplyMemoized(2, 3);
    console.log(`multiplied ${x} * ${y} = ${result2} (without recalculating)`);
  }

  @Memoize()
  public multiplyMemoized(x: number, y: number) {
    console.log(`multiplying ${x} * ${y}`);
    return x * y;
  }

}
