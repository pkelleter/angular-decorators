import {Component, Input} from '@angular/core';
import {PropertyStream} from '../../decorators/property-stream';
import {Observable} from 'rxjs';

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

}
