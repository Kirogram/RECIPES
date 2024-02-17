import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  url = null;


  constructor(private router: Router) {
    router.events.subscribe(() => {
      // @ts-ignore
      this.url = router.url;
    });
  }
}
