import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Memoize} from '../../decorators/memoize';
import {PropertyStream} from '../../decorators/property-stream';
import {Observable} from 'rxjs';
import {EmitOnDestroy} from '../../decorators/emit-on-destroy';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-sub',
  templateUrl: './sub.component.html',
  styleUrls: ['./sub.component.scss']
})
export class SubComponent implements OnInit, OnDestroy {

  @Input()
  public id: number;

  @Input()
  public name: string;

  @PropertyStream()
  public name$: Observable<string>;

  @EmitOnDestroy()
  public destroy$: Observable<void>;

  constructor() {
  }

  public ngOnInit() {
    ({
      0: () => void 0,
      1: () => this.performMath(),
      2: () => this.performSubscriptions()
    })[0]();
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

  private performSubscriptions() {
    this.name$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (name) => console.log(`emit for id ${this.id}`, name),
      () => void 0,
      () => console.log(`complete for id ${this.id}`)
    );
  }
}
