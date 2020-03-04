import { Component } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Service } from '../../../../shared/shared';
import { TranslateService } from '@ngx-translate/core';
import { PickScheduleDateComponent } from '../pickscheduledate/pickscheduledate.component';
import { DefaultTypes } from 'src/app/shared/service/defaulttypes';
import { isUndefined } from 'util';
import { RepeatComponent } from '../repeat/repeat.component';
import { ConfigModalComponent } from '../configmodal/configmodal.component';

@Component({
  selector: ScheduleComponent.SELECTOR,
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent {

  private static readonly SELECTOR = "schedule";
  public scheduleDate: DefaultTypes.HistoryPeriod = null;
  public setDate: string = "Datum festlegen";
  public changeDate: string = "Datum ändern";
  public allDay: boolean = true;
  public repeat: string = "Nie";
  public isConfigSet: boolean = false;
  public scheduledArray = [];
  public setScheduler: boolean = null;

  constructor(
    public modalCtrl: ModalController,
    public service: Service,
    public popoverController: PopoverController,
    public translate: TranslateService,
  ) { }

  ngOnInit() {
    console.log(this.setScheduler)
    if (this.scheduledArray.length > 0) {
      this.setScheduler = false;
    } else {
      this.setScheduler = true;
    }
    console.log(this.setScheduler)
  }

  async presentDatePopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PickScheduleDateComponent,
      event: ev,
      translucent: true,
      cssClass: 'pickdate-popover',
    });
    popover.onDidDismiss().then((result) => {
      if (!isUndefined(result.data)) {
        this.scheduleDate = new DefaultTypes.HistoryPeriod();
        this.scheduleDate.from = result.data.from;
        this.scheduleDate.to = result.data.to;
      }
    });
    return await popover.present();
  }

  async presentRepeatPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: RepeatComponent,
      event: ev,
      translucent: true,
      cssClass: 'pickdate-popover',
    });
    popover.onDidDismiss().then((result) => {
      if (!isUndefined(result.data)) {
        this.repeat = result.data;
      }
    });
    return await popover.present();
  }

  async presentConfigModal() {
    const modal = await this.modalCtrl.create({
      component: ConfigModalComponent,
    });
    modal.onDidDismiss().then((result) => {
      if (!isUndefined(result.data)) {
        if (result.data == true) {
          this.isConfigSet = true;
        }
      }
    });
    return await modal.present();
  }

  applyScheduler() {
    this.popoverController.dismiss(1);
  }
}