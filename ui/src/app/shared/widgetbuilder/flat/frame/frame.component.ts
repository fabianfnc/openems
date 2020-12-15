import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
    selector: 'flat-widget-frame',
    templateUrl: './frame.component.html'
})
export class FlatWidgetFrameComponent {

    constructor(
        public modalCtrl: ModalController,
    ) { }

    ngOnInit() { }

}