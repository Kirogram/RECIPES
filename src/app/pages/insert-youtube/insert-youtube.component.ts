import {Component} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {HttpService} from "../../service/http.service";

declare let gapi: any;

@Component({
  selector: 'app-insert-youtube',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule],
  providers: [HttpService],
  templateUrl: './insert-youtube.component.html',
  styleUrl: './insert-youtube.component.scss'
})
export class InsertYoutubeComponent {

  resultData: any;

  constructor(private hs: HttpService) {
    gapi.load("client:auth2", function () {
      gapi.auth2.init({client_id: "1063780446939-davlg2r8qv1h37agampt26iha4h6qjqb.apps.googleusercontent.com"});
    });
  }

  authenticate() {
    return gapi.auth2.getAuthInstance()
      .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
      .then(function () {
        },
        function (err: any) {
        });
  }

  loadClient() {
    gapi.client.setApiKey("AIzaSyCng4sKcs8d3pPCul1Hw9Lg-ERUXT-K3Xc");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      .then(function () {
        },
        function (err: any) {
        });
  }

  // Make sure the client is loaded and sign-in is complete before calling this method.
  async execute() {
    return gapi.client.youtube.search.list({
      "maxResults": 50,
      "part": [
        "snippet"
      ],
      "q": "피자레시피"
    })
      .then(function (response: any) {
          // Handle the results here (response.result has the parsed body).
          return response;
        },
        function (err: any) {
          console.error("Execute error", err);
        });
  }

  test() {
    this.execute().then((data) => {
      const params: { title: any; desc: any; img: any; createTime: any; url: any; channel: any; }[] = [];
      data.result.items.forEach((d: any) => {
        params.push({
          title: d.snippet.title,
          desc: d.snippet.description,
          img: d.snippet.thumbnails.high.url,
          createTime: d.snippet.publishTime,
          url: d.id.videoId,
          channel: d.snippet.channelTitle
        })
      })
      this.hs.httpPostExample('insertYoutube.do', params).then((data: any) => {
      });
    });

  }
}
