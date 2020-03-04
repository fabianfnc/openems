import { Component } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Service } from '../../../../shared/shared';
import { ScheduleComponent } from '../schedule/schedule.component';

@Component({
  selector: ConfigModalComponent.SELECTOR,
  templateUrl: './configmodal.component.html'
})
export class ConfigModalComponent {

  private static readonly SELECTOR = "config-modal";

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

  applyConfig() {
    this.modalCtrl.dismiss(true)
  }
}