import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/components/toast/toast.component';
import { FooterComponent } from "./layout/footer/footer.component";
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, ToastComponent, RouterOutlet, FooterComponent, SidebarComponent, NavbarComponent],
})
export class AppComponent {
  // todo add refreshJavaScriptCode() ??

  @Input() largeScreen = false;
  
  eventData: string = "default";
  
  handleTypeChange(type: string) {
    console.log("toggle " + type);
    this.eventData = type;
  }
}
