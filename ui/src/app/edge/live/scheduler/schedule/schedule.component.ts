import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Service } from '../../../../shared/shared';

@Component({
  selector: ScheduleComponent.SELECTOR,
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent {

  private static readonly SELECTOR = "schedule";

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
}