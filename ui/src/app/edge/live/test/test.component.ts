import { ActivatedRoute } from '@angular/router';
import { TestModalComponent } from './modal/modal.component';
import { Component } from '@angular/core';
import { ChannelAddress, Edge, Service, Websocket } from '../../../shared/shared';
import { ModalController } from '@ionic/angular';
import { WidgetLine } from 'src/app/shared/type/widget';

@Component({
  selector: TestComponent.SELECTOR,
  templateUrl: './test.component.html'
})
export class TestComponent {

  private static readonly SELECTOR = "test-widget";

  private edge: Edge = null;

  public heading = "General.grid";
  public translateHeading = true;
  public imgUrl = "assets/img/autarchy.png";

  public gridBuy: WidgetLine = {
    name: "General.gridBuyAdvanced",
    translate: true,
    channel: 'sum.grid.buyActivePower',
    unit: 'kW'
  }

  public gridSell: WidgetLine = {
    name: "General.gridSellAdvanced",
    translate: true,
    channel: 'sum.grid.SellActivePower',
    unit: 'kW'
  }


  constructor(
    private route: ActivatedRoute,
    public modalCtrl: ModalController,
    public service: Service,
    private websocket: Websocket
  ) { }

  ngOnInit() {
    this.service.setCurrentComponent('', this.route).then(edge => {
      this.edge = edge;
      edge.subscribeChannels(this.websocket, TestComponent.SELECTOR, [
        new ChannelAddress('_sum', 'GridActivePower'),
      ]);
    });
  }

  ngOnDestroy() {
    if (this.edge != null) {
      this.edge.unsubscribeChannels(this.websocket, TestComponent.SELECTOR);
    }
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: TestModalComponent,
    });
    return await modal.present();
  }
}
