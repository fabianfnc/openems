import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Service } from '../../../../shared/shared';
import { ActiveschedulersComponent } from '../activeschedulers/activeschedulers.component';

@Component({
  selector: SchedulewidgetModalComponent.SELECTOR,
  templateUrl: './modal.component.html'
})
export class SchedulewidgetModalComponent {

  private static readonly SELECTOR = "schedulewidget-modal";

  constructor(
    public modalCtrl: ModalController,
    public service: Service,
  ) { }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ActiveschedulersComponent,
    });
    return await modal.present();
  }
}