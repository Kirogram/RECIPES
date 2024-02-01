import {Component, HostListener, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./layout/header/header.component";
import {ParameterService} from "./service/parameter.service";
import {FooterComponent} from "./layout/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  providers: [ParameterService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'recipes';
  headerBackGround = false;
  pageUrl = this.router.url;

  constructor(private router: Router) {
    router.events.subscribe(() => {
      this.pageUrl = this.router.url;
    })
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent(event: any) {
    this.pageUrl = this.router.url;
    if (document.documentElement.scrollTop == 0) {
      this.headerBackGround = false;
    } else {
      this.headerBackGround = true;
    }
  }

}
