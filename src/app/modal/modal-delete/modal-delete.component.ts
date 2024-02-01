import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {
  deleteMenu: any;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }
}
