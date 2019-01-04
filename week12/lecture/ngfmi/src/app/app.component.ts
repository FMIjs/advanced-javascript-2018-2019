import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'ngfmi';
  showTest = true;

  inputChangeHandler(value) {
    this.title = value;
  }

  ngDoCheck() {
    console.log('Checking...');
  }

  handleEvent(data) {
    console.log(data);
  }

  toggleTest() {
    this.showTest = !this.showTest;
  }
}
