import {Component} from '@angular/core';
import {ModalDefaultComponent} from "../../modal/modal-default/modal-default.component";
import {HttpService} from "../../service/http.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-insert-recipes',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  providers: [HttpService],
  templateUrl: './insert-recipes.component.html',
  styleUrl: './insert-recipes.component.scss'
})
export class InsertRecipesComponent {

  menuName: string = '';
  category: string = '';
  menuSizeBox: any = ['P', 'M', 'L', 'FREE'];
  menuSize: any = [];
  paramsBox: any = [];
  etcTitle: string = '';
  etcDesc: string = '';

  constructor(private hs: HttpService,
              private modalService: NgbModal,
              private activatedRoute: ActivatedRoute) {
    document.documentElement.scrollTop = 0;
    this.activatedRoute.queryParams.subscribe(hashKey => {
      if (hashKey && hashKey['menuName']) {
        this.menuName = hashKey['menuName'];
        this.category = hashKey['catg'];
      }
    });

  }

  inputParamsBox(data: string) {
    this.menuSize.push(data);
    const checkData = this.paramsBox.find((d: any) => d.MENU_SIZE == data);
    if (checkData == undefined) {
      this.paramsBox.push({
        MENU_NAME: null,
        CATG: '',
        MENU_SIZE: data,
        CREATE_DATE: null,
        CHEESE: null,
        DRZ: null,
        TOPPING: null,
        TEXT: null,
        MENU_IMG: '/assets/img/main/no-img.jpg'
      });
    }
  }

  moveData(index: number) {
    const selectData = this.paramsBox[index];
    const beforeSize = this.paramsBox[index + 1].MENU_SIZE;
    this.paramsBox[index + 1] = Object.assign({}, selectData);
    this.paramsBox[index + 1].MENU_SIZE = beforeSize;
  }

  logoUpload(e: Event, data: any) {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    const formData: FormData = new FormData();
    // @ts-ignore
    formData.append('file', target.files[0], target.files[0].name);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://cxdpizza.com//fileUpload.do', true);
    xhr.send(formData);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const resultData = JSON.parse(xhr.response);
        data.MENU_IMG = resultData.imageUrl;
      }
    };
  }

  verificationMenu(params: any) {
    params.MENU_NAME = this.menuName;
    params.CATG = this.category;
    if (params.MENU_NAME == '') {
      const modalRef = this.modalService.open(ModalDefaultComponent);
      modalRef.componentInstance.name = '메뉴명은 필수 입력사항 입니다';
      return;
    }

    this.hs.httpPostExample('checkMenuDuplication.do', params).then((data: any) => {
      if (data > 0) {
        const modalRef = this.modalService.open(ModalDefaultComponent);
        modalRef.componentInstance.name = '중복된 등록정보가 있습니다 \n 해당메뉴 화면에서 메뉴수정 부탁드립니다';
      } else {
        this.insertMenu(params);
      }
    });

  }

  insertMenu(params: any) {
    this.hs.httpPostExample('insertMenu.do', params).then((data: any) => {
      document.documentElement.scrollTop = 0;
      const modalRef = this.modalService.open(ModalDefaultComponent);
      modalRef.componentInstance.name = '등록완료';
    });
  }

  insertGuide() {
    const params = {
      title: this.etcTitle,
      desc: this.etcDesc
    };
    this.hs.httpPostExample('insertGuide.do', params).then((data: any) => {
      document.documentElement.scrollTop = 0;
      const modalRef = this.modalService.open(ModalDefaultComponent);
      modalRef.componentInstance.name = '등록완료';
    });
  }
}
