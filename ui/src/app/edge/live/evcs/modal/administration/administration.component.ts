import { ActivatedRoute } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Edge, Service, EdgeConfig, Websocket } from '../../../../../shared/shared';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: AdministrationComponent.SELECTOR,
  templateUrl: './administration.component.html'
})
export class AdministrationComponent {

  @Input() public evcsComponent: EdgeConfig.Component;
  @Input() public edge: Edge;

  private static readonly SELECTOR = "administration";

  // used for ion-toggle in html
  public isCheckedZoe: boolean = null;

  constructor(
    private route: ActivatedRoute,
    public modalCtrl: ModalController,
    public service: Service,
    private websocket: Websocket,
    public translate: TranslateService,
  ) { }

  ngOnInit() {
    if (this.evcsComponent.properties['minHwCurrent'] == 6000) {
      this.isCheckedZoe = false;
    } else if (this.evcsComponent.properties['minHwCurrent'] == 10000) {
      this.isCheckedZoe = true;
    }
  }

  updateZoeMode(event: CustomEvent) {
    let newValue;
    let oldValue = this.evcsComponent.properties['minHwCurrent'];

    if (event.detail.checked == true) {
      newValue = 10000;
    } else {
      newValue = 6000;
    }

    if (this.edge != null) {
      this.edge.updateComponentConfig(this.websocket, this.evcsComponent.id, [
        { name: 'minHwCurrent', value: newValue }
      ]).then(() => {
        this.evcsComponent.properties.minHwCurrent = newValue;
        this.service.toast(this.translate.instant('General.changeAccepted'), 'success');
      }).catch(reason => {
        this.evcsComponent.properties.minHwCurrent = oldValue;
        this.service.toast(this.translate.instant('General.changeFailed') + '\n' + reason, 'danger');
        console.warn(reason);
      });
    }
  }
}