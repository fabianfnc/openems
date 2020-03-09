import { Component } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Service } from '../../../../shared/shared';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: RepeatSchedulerComponent.SELECTOR,
  templateUrl: './repeat.component.html'
})
export class RepeatSchedulerComponent {

  private static readonly SELECTOR = "scheduleDate";

  constructor(
    public modalCtrl: ModalController,
    public service: Service,
    public popoverController: PopoverController,
    public translate: TranslateService,
  ) { }

  public setRepeat(value: string) {
    this.popoverController.dismiss(value);
  }
}