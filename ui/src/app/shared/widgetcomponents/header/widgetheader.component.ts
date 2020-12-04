import { ActivatedRoute } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Edge, Service, Websocket } from '../../../shared/shared';
import { ModalController } from '@ionic/angular';
import { EdgeConfig } from '../../edge/edgeconfig';
import { WidgetHeaderConfig } from '../../type/widget';

@Component({
    selector: WidgetHeaderComponent.SELECTOR,
    templateUrl: './widgetheader.component.html'
})
export class WidgetHeaderComponent {

    @Input() public widgetHeaderConfig: WidgetHeaderConfig | null = null;

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
        this.service.setCurrentComponent('', this.route).then(edge => {
            this.service.getConfig().then(config => {
                this.edge = edge;
                this.config = config;
                console.log("widgetHeaderConfig", this.widgetHeaderConfig);
            })
        })
    }

    ngOnDestroy() {
        if (this.edge != null) {
            this.edge.unsubscribeChannels(this.websocket, WidgetHeaderComponent.SELECTOR);
        }
    }
}