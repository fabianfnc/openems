import { Component } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Service } from '../../../../shared/shared';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: RepeatComponent.SELECTOR,
  templateUrl: './repeat.component.html'
})
export class RepeatComponent {

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