import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Service } from '../../../../shared/shared';

@Component({
  selector: RevalueModalComponent.SELECTOR,
  templateUrl: './modal.component.html'
})
export class RevalueModalComponent {

  private static readonly SELECTOR = "autarchy-modal";

  constructor(
    public modalCtrl: ModalController,
    public service: Service,
  ) { }
}