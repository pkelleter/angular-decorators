import {Component, OnInit} from '@angular/core';
import {WebStorage} from '../../decorators/web-storage';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @WebStorage('customWebStorageKey')
  public localStorage = 'change me';

  @WebStorage(null, 'session')
  public sessionStorage = 'change me';

  public name = 'value(0)';
  public subComponentsVisible = true;

  constructor() {
    this.handleName();
    this.handleSubComponents();
  }

  public ngOnInit() {
  }

  private handleSubComponents() {
    setInterval(() => this.subComponentsVisible = !this.subComponentsVisible, 4000);
  }

  private handleName() {
    let counter = 0;
    setInterval(() => this.name = `value(${counter++})`, 1000);
  }
}
