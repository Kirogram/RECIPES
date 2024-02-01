import {Component} from '@angular/core';
import {NgbCarouselModule, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientModule} from "@angular/common/http";
import {Router, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpService} from "../../service/http.service";
import {ModalDefaultComponent} from "../../modal/modal-default/modal-default.component";

@Component({
  selector: 'app-youtube',
  standalone: true,
  imports: [NgbCarouselModule, HttpClientModule, RouterModule, CommonModule, FormsModule],
  providers: [HttpService],
  templateUrl: './youtube.component.html',
  styleUrl: './youtube.component.scss'
})
export class YoutubeComponent {

  youtubeData: any = [];

  constructor(private hs: HttpService,
              private router: Router) {

    this.hs.httpPostExample('selectYoutube2.do', null).then((data: any) => {
      let index: any = 0;
      let youtubeList: any[] = [];
      data.forEach((d: any, i: any) => {
        youtubeList.push(d);
        index = index + 1;
        if (index > 4) {
          this.youtubeData.push(youtubeList);
          youtubeList = [];
          index = 0;
        }
      })
      if (youtubeList.length > 0) {
        this.youtubeData.push(youtubeList);
      }
    });
  }

  moveYoutbe(url: string) {
    window.open('https://www.youtube.com/watch?v=' + url);
  }
}
