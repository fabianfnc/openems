import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Service } from '../../../../shared/shared';

type ControllerMode = 'Manual' | 'Auto';
type PumpMode = 'Einschaltbefehl' | 'Einschaltempfehlung' | 'Normalbetrieb' | 'Sperre';

@Component({
  selector: HeatingpumpModalComponent.SELECTOR,
  templateUrl: './modal.component.html'
})
export class HeatingpumpModalComponent {

  private static readonly SELECTOR = "heatingpump-modal";

  public controllerMode: ControllerMode = 'Manual';
  public pumpMode: PumpMode = 'Normalbetrieb';
  public pumpModeValue: Number = null;
  public soc: number = 50;
  public minSwitchingTime: number = 20;


  constructor(
    public modalCtrl: ModalController,
    public service: Service,
  ) { }

  ngOnInit() {
  }

  updateControllerMode(event: CustomEvent) {
    let oldMode = this.controllerMode;
    let newMode = event.detail.value;

    if (oldMode != newMode) {
      this.controllerMode = newMode;
    }
  }

  updatePumpMode(mode: PumpMode) {
    this.pumpMode = mode;
  }
}