import { ActivatedRoute } from '@angular/router';
import { TestModalComponent } from './modal/modal.component';
import { Component } from '@angular/core';
import { Edge, Service } from '../../../shared/shared';
import { ModalController } from '@ionic/angular';

@Component({
  selector: TestComponent.SELECTOR,
  templateUrl: './test.component.html'
})
export class TestComponent {

  private static readonly SELECTOR = "test-widget";

  private edge: Edge = null;

  public heading = "fickMitNick";
  public translateHeading = false;
  public imgUrl = "assets/img/autarchy.png";

  constructor(
    private route: ActivatedRoute,
    public modalCtrl: ModalController,
    public service: Service,
  ) { }

  ngOnInit() {
    this.service.setCurrentComponent('', this.route)
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: TestModalComponent,
    });
    return await modal.present();
  }
}
