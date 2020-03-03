import { ActivatedRoute } from '@angular/router';
import { RedlightModalComponent } from './modal/modal.component';
import { Component } from '@angular/core';
import { Edge, Service } from '../../../shared/shared';
import { ModalController, PopoverController } from '@ionic/angular';

@Component({
  selector: RedlightComponent.SELECTOR,
  templateUrl: './redlight.component.html'
})
export class RedlightComponent {

  private static readonly SELECTOR = "redlight";

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

  // async presentModal() {
  //   const modal = await this.modalCtrl.create({
  //     component: RedlightModalComponent,
  //   });
  //   return await modal.present();
  // }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: RedlightModalComponent,
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
}
