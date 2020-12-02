import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Edge, Service, Utils, Widgets, EdgeConfig, ChannelAddress } from '../../shared/shared';
import { LiveWidgetConfig } from 'src/app/shared/type/widget';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'live',
  templateUrl: './live.component.html'
})
export class LiveComponent {

  public edge: Edge = null
  public config: EdgeConfig = null;
  public widgets: Widgets = null;

  //set config objects for widgets
  public consumptionWidgetConfig: LiveWidgetConfig = {
    headingText: this.translate.instant('General.consumption'),
    isImg: true,
    imgUrl: 'assets/img/consumption.png',
    channels: [
      new ChannelAddress('_sum', 'ConsumptionActivePower'),
      new ChannelAddress('_sum', 'ConsumptionActivePowerL1'),
      new ChannelAddress('_sum', 'ConsumptionActivePowerL2'),
      new ChannelAddress('_sum', 'ConsumptionActivePowerL3'),
    ],
    tableChannelsByNature: [
      {
        nature: 'io.openems.edge.evcs.api.Evcs',
        componentId: '',
        channelId: '',
        hasUnit: true,
        unit: 'kW',
      }
    ],
    tableChannels: [
      {
        text: '',
        componentId: '_sum',
        channelId: 'ConsumptionActivePower',
        hasUnit: true,
        unit: 'kW',
      },
    ],
  }

  constructor(
    private route: ActivatedRoute,
    private service: Service,
    private translate: TranslateService,
    protected utils: Utils,
  ) { }

  ionViewWillEnter() {
    this.service.setCurrentComponent('', this.route).then(edge => {
      this.edge = edge;
    });
    this.service.getConfig().then(config => {
      this.config = config;
      this.widgets = config.widgets;
    })
  }
}
