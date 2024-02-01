import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {HttpService} from "../../service/http.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalChoiceComponent} from "../../modal/modal-choice/modal-choice.component";
import {ModalDefaultComponent} from "../../modal/modal-default/modal-default.component";
import {ModalDeleteComponent} from "../../modal/modal-delete/modal-delete.component";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-detail-recipes',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, MatFormFieldModule, MatIconModule],
  providers: [HttpService],
  templateUrl: './detail-recipes.component.html',
  styleUrl: './detail-recipes.component.scss'
})
export class DetailRecipesComponent {

  menuSize: any;
  menuName: any;
  menuData: any = {
    CHEESE: '',
    TOPPING: '',
    DRZ: '',
    TEXT: '',
  };
  pageLink: any = null;
  catg: any = null;
  openAdmin: any = false;
  checkMenuSize: any = {MENU_SIZE: ''};

  constructor(private activatedRoute: ActivatedRoute,
              private hs: HttpService,
              private modalService: NgbModal,
              private router: Router) {

    this.activatedRoute.queryParams.subscribe(hashKey => {
      this.menuName = hashKey['menuName'];
      this.pageLink = hashKey['pageLink'];
      this.catg = hashKey['catg'];
      if (hashKey['catg'] == 'SIDE') {
        this.menuSize = 'F'
        this.openPizza();
      }

      const params = {MENU_NAME: this.menuName}
      this.hs.httpPostExample('selectMenuSizeCheck.do', params).then((data: any) => {
        this.checkMenuSize = data;
        this.menuSize = this.checkMenuSize[0].MENU_SIZE;
        this.openPizza();
      });

    });
  }

  openPizza(params?: any) {
    if (params) {
      this.menuSize = params;
    }
    const resultParams = {
      menuName: this.menuName,
      menuSize: this.menuSize
    }
    this.hs.httpPostExample('selectMenuDesc.do', resultParams).then((data: any) => {
      this.menuData = data;
    });
  }

  deleteMenu() {
    const modalRef = this.modalService.open(ModalDeleteComponent);
    modalRef.result.then((d: string) => {
      if (d == '삭제') {
        this.hs.httpPostExample('deleteMenu.do', this.menuData).then((data: any) => {
          const modalRef = this.modalService.open(ModalDefaultComponent);
          modalRef.componentInstance.name = '삭제되었습니다';
          location.reload();
        });
      } else {
        const modalRef = this.modalService.open(ModalDefaultComponent);
        modalRef.componentInstance.name = '문자열이 일치하지 않습니다';
      }
    });
  }

  updateMenu() {
    this.router.navigate(['/updateMenu'], {queryParams: {seq: this.menuData.SEQ, pageLink: this.pageLink}});
  }

  addMenuSize() {
    this.router.navigate(['/insertMenu'], {queryParams: {menuName: this.menuName, catg: this.catg}});
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
}
