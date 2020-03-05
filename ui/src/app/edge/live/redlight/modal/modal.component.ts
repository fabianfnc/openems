import { Component, Input } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Service } from '../../../../shared/shared';
import { ScheduleComponent } from '../schedule/schedule.component';
import { isUndefined } from 'util';
import { DefaultTypes } from 'src/app/shared/service/defaulttypes';

@Component({
  selector: RedlightModalComponent.SELECTOR,
  templateUrl: './modal.component.html'
})
export class RedlightModalComponent {

  @Input() public schedulers: { name: string, date: DefaultTypes.HistoryPeriod, repeat: string, allDay: boolean }[];

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

  async presentModal(ev: any) {
    const modal = await this.modalCtrl.create({
      component: ScheduleComponent,
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