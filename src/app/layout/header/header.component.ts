import {Component, Input} from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() headerBackGround: boolean = false;
  @Input() pageUrl: any;

  constructor(private router: Router) {
  }
}
