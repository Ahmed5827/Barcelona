import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutUs } from "./about-us/about-us";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AboutUs],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('barcelona');
}
