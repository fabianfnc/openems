import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Service } from '../../../../shared/shared';

@Component({
  selector: TestModalComponent.SELECTOR,
  templateUrl: './modal.component.html'
})
export class TestModalComponent {

  private static readonly SELECTOR = "test-modal";

  constructor(
    public modalCtrl: ModalController,
    public service: Service,
  ) { }
}