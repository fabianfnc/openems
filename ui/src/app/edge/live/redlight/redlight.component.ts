import { ActivatedRoute } from '@angular/router';
import { RedlightModalComponent } from './modal/modal.component';
import { Component } from '@angular/core';
import { Edge, Service } from '../../../shared/shared';
import { ModalController, PopoverController } from '@ionic/angular';
import { isUndefined } from 'util';
import { DefaultTypes } from 'src/app/shared/service/defaulttypes';

@Component({
  selector: RedlightComponent.SELECTOR,
  templateUrl: './redlight.component.html'
})
export class RedlightComponent {

  private static readonly SELECTOR = "redlight";
  public schedulers: { name: string, date: DefaultTypes.HistoryPeriod, repeat: string }[] = [];

  private edge: Edge = null;

  constructor(
    private route: ActivatedRoute,
    public modalCtrl: ModalController,
    public service: Service,
    public popoverController: PopoverController,
  ) { }

  ngOnInit() {
    this.service.setCurrentComponent('', this.route).then(edge => {
      this.edge = edge;
    })
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: RedlightModalComponent,
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
