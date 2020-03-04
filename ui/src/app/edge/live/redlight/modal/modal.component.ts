import { Component } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Service } from '../../../../shared/shared';
import { ScheduleComponent } from '../schedule/schedule.component';

@Component({
  selector: RedlightModalComponent.SELECTOR,
  templateUrl: './modal.component.html'
})
export class RedlightModalComponent {

  private static readonly SELECTOR = "redlight-modal";

  public isOn: boolean = true;

  constructor(
    public modalCtrl: ModalController,
    public service: Service,
    public popoverController: PopoverController,
  ) { }

  /**  
  * Updates the 'isOn'-Property of the FixDigitalOutput-Controller.
  * 
  * @param event 
  */
  updateMode(event: CustomEvent) {
    let newMode = event.detail.value;
    console.log("neuer Modus: ", newMode)
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ScheduleComponent,
      event: ev,
      translucent: true,
      cssClass: 'pickdate-popover',
    });
    return await popover.present();
  }
}