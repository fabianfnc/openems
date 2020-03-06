import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Service } from '../../../../shared/shared';
import { format, getDay, isSameDay, subDays, getHours, getMinutes, getTime, setHours, setMinutes, parseISO, startOfDay, endOfDay, addDays } from 'date-fns';

@Component({
  selector: ActiveschedulersComponent.SELECTOR,
  templateUrl: './activeschedulers.component.html'
})
export class ActiveschedulersComponent {

  private static readonly SELECTOR = "activeschedulers";

  today = new Date();

  public eventSource = [
    {
      title: 'Heizstab',
      startTime: new Date(),
      endTime: addDays(new Date(), 5),
      allDay: true,
      eventColor: 'red'
    },
    {
      title: 'Zwangsbeladung 5kW',
      startTime: new Date(),
      endTime: addDays(new Date(), 7),
      allDay: true,
      eventColor: 'black'
    }
  ];
  public selectedDate = new Date();
  isToday: boolean = true;
  markDisabled = (date: Date) => {
    var d = new Date();
    // d.setDate(d.getDate() - 1);
    return date < d;
  };
  calendar = {
    mode: 'month',
    currentDate: this.selectedDate
  }

  constructor(
    public modalCtrl: ModalController,
    public service: Service,
  ) { }


  changeMode(mode) {
    this.calendar.mode = mode;
  }
  loadEvents() {

  }
  onCurrentDateChanged(ev) {
    console.log(ev);
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    ev.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === ev.getTime();
  }
  onViewTitleChanged(Title) {
    console.log("title", Title)
  }
  onTimeSelected(event) {
    console.log(event);
    var date = new Date().getTime();
    console.log(date);
    var task = "work fast";

  }
  onEventSelected(event) {
    console.log(event);
  }
}