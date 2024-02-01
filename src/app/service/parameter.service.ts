import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  userInfo = {status: 'fail', userName: null};
  url = null;
  browserWidth = 0;
  privacy = 1;
  cleanType = 1;
  cleanTypeItem = 0;
  shopSession = false;


  constructor(private router: Router) {
    router.events.subscribe(() => {
      // @ts-ignore
      this.url = router.url;
    });
  }
}
