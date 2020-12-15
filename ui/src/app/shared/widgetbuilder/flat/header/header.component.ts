import { Component, Input } from '@angular/core';


@Component({
    selector: 'flat-widget-header',
    templateUrl: './header.component.html'
})
export class FlatWidgetHeaderComponent {

    @Input() public heading: string | null = null;
    @Input() public translateHeading: boolean | null = null;
    @Input() public iconName?: string | null = null;
    @Input() public iconColor?: string | null = null;
    @Input() public imgUrl?: string | null = null;

    constructor() { }

    ngOnInit() { }

}