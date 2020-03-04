import { Component } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Service } from '../../../../shared/shared';
import { IMyDrpOptions, IMyDate, IMyDateRangeModel, IMyDayLabels, IMyMonthLabels } from 'mydaterangepicker';
import { getYear, getMonth, getDate, subDays, addDays } from 'date-fns';
import { DefaultTypes } from 'src/app/shared/service/defaulttypes';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: ScheduleComponent.SELECTOR,
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent {

  private static readonly SELECTOR = "schedule";

  public isOn: boolean = true;

  public readonly TODAY = new Date();
  public readonly YESTERDAY = subDays(new Date(), 1);
  public readonly TOMORROW = addDays(new Date(), 1);

  constructor(
    public modalCtrl: ModalController,
    public service: Service,
    public popoverController: PopoverController,
    public translate: TranslateService,
  ) { }

  public transDayLables: IMyDayLabels = {
    su: this.translate.instant('Edge.History.sun'),
    mo: this.translate.instant('Edge.History.mon'),
    tu: this.translate.instant('Edge.History.tue'),
    we: this.translate.instant('Edge.History.wed'),
    th: this.translate.instant('Edge.History.thu'),
    fr: this.translate.instant('Edge.History.fri'),
    sa: this.translate.instant('Edge.History.sat')
  };

  public transMonthLabels: IMyMonthLabels = {
    1: this.translate.instant('Edge.History.jan'),
    2: this.translate.instant('Edge.History.feb'),
    3: this.translate.instant('Edge.History.mar'),
    4: this.translate.instant('Edge.History.apr'),
    5: this.translate.instant('Edge.History.may'),
    6: this.translate.instant('Edge.History.jun'),
    7: this.translate.instant('Edge.History.jul'),
    8: this.translate.instant('Edge.History.aug'),
    9: this.translate.instant('Edge.History.sep'),
    10: this.translate.instant('Edge.History.oct'),
    11: this.translate.instant('Edge.History.nov'),
    12: this.translate.instant('Edge.History.dec')
  };

  //DateRangePicker Options
  public dateRangePickerOptions: IMyDrpOptions = {
    selectorHeight: '225px',
    inline: true,
    showClearBtn: false,
    showApplyBtn: false,
    dateFormat: 'dd.mm.yyyy',
    disableUntil: { day: 1, month: 1, year: 2013 }, // TODO start with date since the edge is available
    disableSince: this.toIMyDate(this.TOMORROW),
    showWeekNumbers: true,
    showClearDateRangeBtn: false,
    editableDateRangeField: false,
    openSelectorOnInputClick: true,
    selectBeginDateTxt: this.translate.instant('Edge.History.beginDate'),
    selectEndDateTxt: this.translate.instant('Edge.History.endDate'),
    dayLabels: this.transDayLables,
    monthLabels: this.transMonthLabels
  };

  /**
 * Converts a 'Date' to 'IMyDate' format.
 * 
 * @param date the 'Date'
 * @returns the 'IMyDate'
 */
  public toIMyDate(date: Date): IMyDate {
    return { year: getYear(date), month: getMonth(date) + 1, day: getDate(date) }
  }

  public onDateRangeChanged(event: IMyDateRangeModel) {
    let datePeriod = new DefaultTypes.HistoryPeriod(event.beginJsDate, event.endJsDate);
    let dateDistance = Math.floor(Math.abs(<any>this.service.historyPeriod.from - <any>this.service.historyPeriod.to) / (1000 * 60 * 60 * 24));
    dateDistance == 0 ? dateDistance = 1 : dateDistance = dateDistance;
    console.log("dateperiod:", datePeriod)
    console.log("datedistance:", dateDistance)
  }
}