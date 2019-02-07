import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public name: string;
  private counter = 1;

  constructor() {
    setInterval(() => this.name = 'decorators ' + this.counter++, 1000);
  }

}
