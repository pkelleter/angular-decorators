import {Component, OnDestroy, OnInit} from '@angular/core';
import {Memoize} from '../../decorators/memoize';

@Component({
  selector: 'app-sub',
  templateUrl: './sub.component.html',
  styleUrls: ['./sub.component.scss']
})
export class SubComponent implements OnInit, OnDestroy {

  constructor() {
  }

  public ngOnInit() {
    this.performMath();
  }

  public ngOnDestroy() {
  }

  @Memoize()
  public multiplyMemoized(x: number, y: number) {
    console.log(`actually multiplying ${x} * ${y}`);
    return x * y;
  }

  private performMath() {
    const x = 2;
    const y = 3;
    const result1 = this.multiplyMemoized(x, y);
    console.log(`invoked multiply ${x} * ${y} = ${result1}`);
    const result2 = this.multiplyMemoized(x, y);
    console.log(`invoked multiply ${x} * ${y} = ${result2}`);
  }

}
