import {Component, Input, OnInit} from '@angular/core';
import {PropertyStream} from '../../decorators/property-stream';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @Input()
  public name: string;

  @PropertyStream()
  public readonly name$: Observable<string>;

  public subComponentVisible = true;

  constructor() {
    this.handleSubComponent();
  }

  public ngOnInit() {
  }

  private handleSubComponent() {
    setInterval(() => {
      this.subComponentVisible = !this.subComponentVisible;
    }, 2000);
  }

}
