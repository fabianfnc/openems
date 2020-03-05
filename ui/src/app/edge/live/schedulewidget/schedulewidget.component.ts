import { ActivatedRoute } from '@angular/router';
import { SchedulewidgetModalComponent } from './modal/modal.component';
import { Component } from '@angular/core';
import { Edge, Service } from '../../../shared/shared';
import { ModalController } from '@ionic/angular';

@Component({
  selector: SchedulewidgetComponent.SELECTOR,
  templateUrl: './schedulewidget.component.html'
})
export class SchedulewidgetComponent {

  private static readonly SELECTOR = "schedulewidget";

  private edge: Edge = null;

  constructor(
    private route: ActivatedRoute,
    public modalCtrl: ModalController,
    public service: Service,
  ) { }

  ngOnInit() {
    this.service.setCurrentComponent('', this.route).then(edge => {
      this.edge = edge;
    })
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: SchedulewidgetModalComponent,
    });
    return await modal.present();
  }
}
