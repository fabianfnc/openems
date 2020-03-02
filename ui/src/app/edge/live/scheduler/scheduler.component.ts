import { ActivatedRoute } from '@angular/router';
import { SchedulerModalComponent } from './modal/modal.component';
import { Component } from '@angular/core';
import { Edge, Service } from '../../../shared/shared';
import { ModalController } from '@ionic/angular';

@Component({
  selector: SchedulerComponent.SELECTOR,
  templateUrl: './scheduler.component.html'
})
export class SchedulerComponent {

  private static readonly SELECTOR = "scheduler";

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
      component: SchedulerModalComponent,
    });
    return await modal.present();
  }
}
