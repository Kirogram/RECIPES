import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-modal-choice',
  templateUrl: './modal-choice.component.html',
  imports: [CommonModule, FormsModule],
  standalone: true,
  styleUrls: ['./modal-choice.component.scss']
})
export class ModalChoiceComponent implements OnInit {
  adminPW: any;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }
}
