import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Edge, Service } from '../../../shared/shared';
import { ModalController } from '@ionic/angular';
import { RevalueModalComponent } from './modal/modal.component';

@Component({
  selector: RevalueComponent.SELECTOR,
  templateUrl: './revalue.component.html'
})
export class RevalueComponent {

  private static readonly SELECTOR = "revalue";

  private edge: Edge = null;

  constructor(
    private route: ActivatedRoute,
    public modalCtrl: ModalController,
    public service: Service,
  ) { }

  ngOnInit() {
    this.service.setCurrentComponent('', this.route)
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: RevalueModalComponent,
    });
    return await modal.present();
  }
}
