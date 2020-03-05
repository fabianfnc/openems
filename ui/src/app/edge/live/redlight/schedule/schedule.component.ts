import { Component, Input } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Service } from '../../../../shared/shared';
import { TranslateService } from '@ngx-translate/core';
import { PickScheduleDateComponent } from '../pickscheduledate/pickscheduledate.component';
import { DefaultTypes } from 'src/app/shared/service/defaulttypes';
import { isUndefined } from 'util';
import { RepeatComponent } from '../repeat/repeat.component';
import { ConfigModalComponent } from '../configmodal/configmodal.component';
import { format, getDay, isSameDay, subDays, getHours, getMinutes, getTime, setHours, setMinutes, parseISO, startOfDay, endOfDay } from 'date-fns';

@Component({
  selector: ScheduleComponent.SELECTOR,
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent {

  @Input() public schedulers: { name: string, date: DefaultTypes.HistoryPeriod, repeat: string, allDay: boolean }[];

  private static readonly SELECTOR = "schedule";
  public scheduleDate: DefaultTypes.HistoryPeriod = new DefaultTypes.HistoryPeriod();
  public setDate: string = "Datum festlegen";
  public changeDate: string = "Datum ändern";
  public allDay: boolean = true;
  public repeat: string = "Nie";
  public name: string = "scheduler1"
  public isConfigSet: boolean = false;
  public setScheduler: boolean = null;
  public schedulerName: string = "Scheduler";

  constructor(
    public modalCtrl: ModalController,
    public service: Service,
    public popoverController: PopoverController,
    public translate: TranslateService,
  ) { }

  ngOnInit() {
    if (this.schedulers.length > 0) {
      this.setScheduler = false;
    } else {
      this.setScheduler = true;
    }
    this.scheduleDate.from = startOfDay(this.scheduleDate.from);
    this.scheduleDate.to = endOfDay(this.scheduleDate.to);
    console.log("date", this.scheduleDate)
    this.schedulerName = "Scheduler" + (this.schedulers.length + 1).toString();
  }

  updateVonTime(event) {
    let vonDate = new Date(parseISO(event.detail.value))
    let hours = vonDate.getHours();
    let minutes = vonDate.getMinutes();
    console.log("origin von", this.scheduleDate.from)
    this.scheduleDate.from.setHours(hours);
    this.scheduleDate.from.setMinutes(minutes);
    console.log("new von", this.scheduleDate.from)
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
    this.schedulers.push({ name: this.schedulerName, date: this.scheduleDate, repeat: this.repeat, allDay: this.allDay });
    this.modalCtrl.dismiss(this.schedulers);
  }

  removeScheduler(index) {
    this.schedulers.splice(index, 1)
    if (this.schedulers.length == 0) {
      this.setScheduler = true;
    }
  }
}