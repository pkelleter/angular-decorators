import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

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
