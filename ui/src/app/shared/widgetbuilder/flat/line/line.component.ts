import { Component, Input } from '@angular/core';
import { Service } from 'src/app/shared/shared';
import { WidgetLine } from 'src/app/shared/type/widget';


@Component({
    selector: 'flat-widget-line',
    templateUrl: './line.component.html'
})
export class FlatWidgetLineComponent {

    @Input() public lineObject: WidgetLine | null = null;

    constructor(
        public service: Service,
    ) { }

    ngOnInit() {
        this.service.currentEdge.subscribe(edge => {
            edge.currentData.subscribe(currentData => {
                console.log("cd", currentData.summary)
            })
        })
    }
}