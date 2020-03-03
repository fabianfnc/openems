import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ScheduleComponent,
    });
    return await modal.present();
  }
}