import { Component, Input } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Service } from '../../../../shared/shared';
import { DefaultTypes } from 'src/app/shared/service/defaulttypes';
import { RepeatSchedulerComponent } from '../repeat/repeat.component';
import { parseISO, startOfDay, endOfDay } from 'date-fns';
import { PickScheduleScheduleDateComponent } from '../pickscheduledate/pickscheduledate.component';
import { isUndefined } from 'util';
import { ConfigOtherModalComponent } from '../configmodal/configmodal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: AddOtherWidgetComponent.SELECTOR,
  templateUrl: './addotherwidget.component.html'
})
export class AddOtherWidgetComponent {

  @Input() public schedulers: { name: string, date: DefaultTypes.HistoryPeriod, repeat: string, allDay: boolean }[];

  private static readonly SELECTOR = "addotherwidget";

  public scheduleDate: DefaultTypes.HistoryPeriod = new DefaultTypes.HistoryPeriod();
  public setDate: string = "Datum festlegen";
  public changeDate: string = "Datum ändern";
  public allDay: boolean = true;
  public repeat: string = "Nie";
  public name: string = "scheduler1"
  public isConfigSet: boolean = false;
  public setScheduler: boolean = null;
  public schedulerName: string = "Scheduler";
  public hovers: boolean[] = [];
  public hovers1: boolean[] = []


  constructor(
    public modalCtrl: ModalController,
    public popoverController: PopoverController,
    public service: Service,
    public translate: TranslateService
  ) { }

  ngOnInit() {
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
      component: PickScheduleScheduleDateComponent,
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
      component: RepeatSchedulerComponent,
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
      component: ConfigOtherModalComponent,
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
}