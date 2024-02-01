import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  localHost = environment.url;

  constructor(private http: HttpClient) {

  }

  httpPostExample(url: string, params: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.localHost + url, params, {
        withCredentials: true
      }).subscribe((val) => {
        resolve(val);
      }, response => {
        resolve(response);
      });
    });
  }

  httpGetExample(url: string, params: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.localHost + url).subscribe((val) => {
        resolve(val);
      }, response => {
        resolve(response);
      });
    });
  }
}
