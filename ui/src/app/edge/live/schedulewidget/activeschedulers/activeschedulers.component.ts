import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Service } from '../../../../shared/shared';
import { format, getDay, isSameDay, subDays, getHours, getMinutes, getTime, setHours, setMinutes, parseISO, startOfDay, endOfDay, addDays, addMonths, subMonths } from 'date-fns';

@Component({
  selector: ActiveschedulersComponent.SELECTOR,
  templateUrl: './activeschedulers.component.html'
})
export class ActiveschedulersComponent {

  private static readonly SELECTOR = "activeschedulers";

  today = new Date();
  public monat: string = '';
  public title: string = '';

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
    },
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

  nextMonth() {
    this.calendar.currentDate = addMonths(this.calendar.currentDate, 1)
    this.setMonth()
  }

  previousMonth() {
    this.calendar.currentDate = subMonths(this.calendar.currentDate, 1)
    this.setMonth()
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }
  loadEvents() {

  }

  setMonth() {
    switch (this.calendar.currentDate.getMonth()) {
      case 1: {
        this.monat = "Januar"
        break;
      }
      case 2: {
        this.monat = "Februar"
        break;
      }
      case 3: {
        this.monat = "März"
        break;
      }
      case 4: {
        this.monat = "April"
        break;
      }
      case 5: {
        this.monat = "Mai"
        break;
      }
      case 6: {
        this.monat = "Juni"
        break;
      }
      case 7: {
        this.monat = "Juli"
        break;
      }
      case 8: {
        this.monat = "August"
        break;
      }
      case 9: {
        this.monat = "September"
        break;
      }
      case 10: {
        this.monat = "Oktober"
        break;
      }
      case 11: {
        this.monat = "November"
        break;
      }
      case 12: {
        this.monat = "Dezember"
        break;
      }
    }
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
    this.title = Title;
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