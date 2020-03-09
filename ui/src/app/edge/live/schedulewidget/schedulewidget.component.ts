import { ActivatedRoute } from '@angular/router';
import { SchedulewidgetModalComponent } from './modal/modal.component';
import { Component } from '@angular/core';
import { Edge, Service } from '../../../shared/shared';
import { ModalController } from '@ionic/angular';
import { DefaultTypes } from 'src/app/shared/service/defaulttypes';
import { isUndefined } from 'util';

@Component({
  selector: SchedulewidgetComponent.SELECTOR,
  templateUrl: './schedulewidget.component.html'
})
export class SchedulewidgetComponent {

  private static readonly SELECTOR = "schedulewidget";

  private edge: Edge = null;

  public schedulers: { name: string, date: DefaultTypes.HistoryPeriod, repeat: string, allDay: boolean }[] = [];


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
      componentProps: {
        schedulers: this.schedulers
      },
    });
    modal.onDidDismiss().then((result) => {
      if (!isUndefined(result.data)) {
        this.schedulers = result.data;
      }
    });
    return await modal.present();
  }
}
