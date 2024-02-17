import {Component} from '@angular/core';
import {HttpService} from "../service/http.service";
import {Router, RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {AsyncPipe, CommonModule} from "@angular/common";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalChoiceComponent} from "../modal/modal-choice/modal-choice.component";
import {ModalDefaultComponent} from "../modal/modal-default/modal-default.component";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {map, Observable, startWith} from "rxjs";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {YoutubeComponent} from "./youtube/youtube.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe, MatIconModule, MatExpansionModule,
    YoutubeComponent],
  providers: [HttpService],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  myControl = new FormControl('');
  options: string[] = [];
  korean = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

  filteredOptions: Observable<string[]>;

  openAdmin: boolean = false;
  fullMenu: any = [];
  menuShow = true;
  guideData: any;

  constructor(private hs: HttpService,
              private modalService: NgbModal,
              private router: Router) {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''), map(value => this._filter(value || '')));
    this.selectMenu();
    this.selectGuide();
  }

  test() {
    console.log(this.myControl.getRawValue());
    this.router.navigate(['/detailRecipe'], {
      queryParams: {
        menuName: this.myControl.getRawValue(),
        catg: 'pizza',
        pageLink: '/detailRecipe'
      }
    });
  }

  private _filter(value: string): string[] {
    if (value === '') return [];

    const filterValue = value.toLowerCase();
    const regex = this.makeRegex(filterValue);
    return this.options.filter(option => {
      return regex.test(option);
    });
  }

  makeRegex(search = '') {
    const regex = this.korean.reduce(
      (data, key, index) => data.replace(new RegExp(key, "g"),
        `[${this.combine(index, 0, 0)}-${this.combine(index + 1, 0, -1)}]`), search);
    return new RegExp(`(${regex})`, "g");
  }

  combine(first: number, mid: number, last: number) {

    const start_charCode = "가".charCodeAt(0);
    const start_period = Math.floor("까".charCodeAt(0) - "가".charCodeAt(0));
    const mid_period = Math.floor("개".charCodeAt(0) - "가".charCodeAt(0));

    return String.fromCharCode(
      Number(start_charCode + first * start_period + mid * mid_period + last)
    );
  }

  selectMenu() {
    this.hs.httpPostExample('selectMenuList.do', null).then((data: any) => {
      this.fullMenu = [];
      let eachMenu: any[] = [];
      let menuName = '';
      if (data) {
        menuName = data[0].CATG;
      }
      data.forEach((d: any) => {
        this.options.push(d.MENU_NAME);
        d.MENU_SIZE = d.MENU_SIZE.split(',');
        if (menuName == d.CATG) {
          eachMenu.push(d);
        } else {
          this.fullMenu.push(eachMenu);
          menuName = d.CATG;
          eachMenu = [];
          eachMenu.push(d);
        }
      })
      this.fullMenu.push(eachMenu);
    });
  }

  selectGuide() {
    this.hs.httpPostExample('selectGuide.do', null).then((data: any) => {
      this.guideData = data;
    });
  }

  checkAdmin() {
    const modalRef = this.modalService.open(ModalChoiceComponent);
    modalRef.result.then((d: string) => {
      const params = {
        pw: d
      }
      this.hs.httpPostExample('checkAdminPW.do', params).then((data: any) => {
        if (data.CHECK_PW === 'Y') {
          this.openAdmin = true;
        } else {
          const modalRef = this.modalService.open(ModalDefaultComponent);
          modalRef.componentInstance.name = '암호가 일치하지 않습니다.';
        }
      });
    });
  }

  openSubPage(pageLink: any, params: any) {
    this.router.navigate([pageLink], {
      queryParams: {
        menuName: params.MENU_NAME,
        catg: params.CATG,
        pageLink: pageLink
      }
    });
  }
}
