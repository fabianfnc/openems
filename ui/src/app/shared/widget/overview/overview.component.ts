import { ActivatedRoute } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Edge, Service, Websocket } from '../../../shared/shared';
import { ModalController } from '@ionic/angular';
import { LiveWidgetConfig } from '../../type/widget';
import { EdgeConfig } from '../../edge/edgeconfig';

@Component({
    selector: OverviewWidgetComponent.SELECTOR,
    templateUrl: './overview.component.html'
})
export class OverviewWidgetComponent {

    @Input() public widgetConfig: LiveWidgetConfig | null = null;

    private static readonly SELECTOR = "overview-widget";

    private edge: Edge | null = null;
    private config: EdgeConfig | null = null;

    public component: EdgeConfig.Component | null = null;


    constructor(
        private route: ActivatedRoute,
        public modalCtrl: ModalController,
        public service: Service,
        private websocket: Websocket,
    ) { }

    ngOnInit() {
        console.log("widgetConfig:", this.widgetConfig)
        this.service.setCurrentComponent('', this.route).then(edge => {
            this.service.getConfig().then(config => {
                this.edge = edge;
                this.config = config;
                if (this.widgetConfig.componentId) {
                    this.component = config.components[this.widgetConfig.componentId];
                }
                if (this.widgetConfig.channels) {
                    this.edge.subscribeChannels(this.websocket, OverviewWidgetComponent.SELECTOR, this.widgetConfig.channels);
                }
            })
        })
    }

    ngOnDestroy() {
        if (this.edge != null) {
            this.edge.unsubscribeChannels(this.websocket, OverviewWidgetComponent.SELECTOR);
        }
    }
}