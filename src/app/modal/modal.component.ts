import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() message: string;
  @Input() body: string;
  @Output() yesButton = new EventEmitter<void>();
  @Output() noButton = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

}
