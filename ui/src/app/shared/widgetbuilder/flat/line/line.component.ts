import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
    selector: 'flat-widget-line',
    templateUrl: './line.component.html'
})
export class FlatWidgetLineComponent {

    constructor(
        public modalCtrl: ModalController,
    ) { }

    ngOnInit() { }

}