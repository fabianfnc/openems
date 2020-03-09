import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Service } from '../../../../shared/shared';
import { ActiveschedulersComponent } from '../activeschedulers/activeschedulers.component';
import { AddOtherWidgetComponent } from '../addotherwidget/addotherwidget.component';
import { DefaultTypes } from 'src/app/shared/service/defaulttypes';
import { isUndefined } from 'util';

@Component({
  selector: SchedulewidgetModalComponent.SELECTOR,
  templateUrl: './modal.component.html'
})
export class SchedulewidgetModalComponent {

  @Input() public schedulers: { name: string, date: DefaultTypes.HistoryPeriod, repeat: string, allDay: boolean, hoverConfig?: boolean, hoverRemove?: boolean }[];


  private static readonly SELECTOR = "schedulewidget-modal";
  public hover0: boolean = false;
  public hover1: boolean = false;
  public hover2: boolean = false;
  public hover3: boolean = false;

  constructor(
    public modalCtrl: ModalController,
    public service: Service,
  ) { }

  ngOnInit() {
    this.schedulers.forEach((element, index) => {
      let hover: boolean = false;
      this.schedulers[index].hoverConfig = false;
      this.schedulers[index].hoverRemove = false;
    })
  }

  async presentModalActiveSchedulers() {
    const modal = await this.modalCtrl.create({
      component: ActiveschedulersComponent,
    });
    return await modal.present();
  }

  async presentModalAddOtherWidgets() {
    const modal = await this.modalCtrl.create({
      component: AddOtherWidgetComponent,
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

  removeScheduler(index) {
    this.schedulers.splice(index, 1)
  }
}