import { AsymmetricPeakshavingComponent } from './peakshaving/asymmetric/asymmetricpeakshaving.component';
import { AsymmetricPeakshavingModalComponent } from './peakshaving/asymmetric/modal/modal.component';
import { AutarchyComponent } from './autarchy/autarchy.component';
import { AutarchyModalComponent } from './autarchy/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ChannelthresholdComponent } from './channelthreshold/channelthreshold.component';
import { ChpSocComponent } from './chpsoc/chpsoc.component';
import { ChpsocModalComponent } from './chpsoc/chpsoc-modal/modal.page';
import { ConfigModalComponent } from './redlight/configmodal/configmodal.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { ConsumptionModalComponent } from './consumption/modal/modal.component';
import { EnergymonitorModule } from './energymonitor/energymonitor.module';
import { EvcsChart } from './evcsCluster/modal/evcs-chart/evcs.chart';
import { EvcsClusterComponent } from './evcsCluster/evcsCluster.component';
import { EvcsComponent } from './evcs/evcs.component';
import { EvcsModalComponent } from './evcs/modal/modal.page';
import { EvcsPopoverComponent } from './evcs/modal/popover/popover.page';
import { FixDigitalOutputComponent } from './fixdigitaloutput/fixdigitaloutput.component';
import { FixDigitalOutputModalComponent } from './fixdigitaloutput/modal/modal.component';
import { GridComponent } from './grid/grid.component';
import { GridModalComponent } from './grid/modal/modal.component';
import { InfoComponent } from './info/info.component';
import { LiveComponent } from './live.component';
import { ModalComponentEvcsCluster } from './evcsCluster/modal/evcsCluster-modal.page';
import { ModbusApiComponent } from './modbusapi/modbusapi.component';
import { NgModule } from '@angular/core';
import { OfflineComponent } from './offline/offline.component';
import { PickScheduleDateComponent } from './redlight/pickscheduledate/pickscheduledate.component';
import { ProductionComponent } from './production/production.component';
import { ProductionModalComponent } from './production/modal/modal.component';
import { RedlightComponent } from './redlight/redlight.component';
import { RedlightModalComponent } from './redlight/modal/modal.component';
import { RepeatComponent } from './redlight/repeat/repeat.component';
import { ScheduleComponent } from './redlight/schedule/schedule.component';
import { SelfConsumptionComponent } from './selfconsumption/selfconsumption.component';
import { SelfconsumptionModalComponent } from './selfconsumption/modal/modal.component';
import { SharedModule } from './../../shared/shared.module';
import { SinglethresholdComponent } from './singlethreshold/singlethreshold.component';
import { SinglethresholdModalComponent } from './singlethreshold/modal/modal.component';
import { StorageComponent } from './storage/storage.component';
import { StorageModalComponent } from './storage/modal/modal.component';
import { SymmetricPeakshavingComponent } from './peakshaving/symmetric/symmetricpeakshaving.component';
import { SymmetricPeakshavingModalComponent } from './peakshaving/symmetric/modal/modal.component';
import { SchedulewidgetComponent } from './schedulewidget/schedulewidget.component';
import { SchedulewidgetModalComponent } from './schedulewidget/modal/modal.component';
import { NgCalendarModule } from 'ionic2-calendar';
import { ActiveschedulersComponent } from './schedulewidget/activeschedulers/activeschedulers.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    EnergymonitorModule,
    SharedModule,
    NgCalendarModule,
  ],
  entryComponents: [
    AsymmetricPeakshavingModalComponent,
    AutarchyModalComponent,
    ChpsocModalComponent,
    ChpsocModalComponent,
    ConfigModalComponent,
    ConsumptionModalComponent,
    EvcsModalComponent,
    EvcsPopoverComponent,
    FixDigitalOutputModalComponent,
    GridModalComponent,
    ModalComponentEvcsCluster,
    PickScheduleDateComponent,
    ProductionModalComponent,
    RedlightModalComponent,
    RepeatComponent,
    ScheduleComponent,
    SchedulewidgetModalComponent,
    SelfconsumptionModalComponent,
    SinglethresholdModalComponent,
    StorageModalComponent,
    SymmetricPeakshavingModalComponent,
    ActiveschedulersComponent,
  ],
  declarations: [
    ActiveschedulersComponent,
    AsymmetricPeakshavingComponent,
    AsymmetricPeakshavingModalComponent,
    AutarchyComponent,
    AutarchyModalComponent,
    ChannelthresholdComponent,
    ChpSocComponent,
    ChpsocModalComponent,
    ConfigModalComponent,
    ConsumptionComponent,
    ConsumptionModalComponent,
    EvcsChart,
    EvcsClusterComponent,
    EvcsComponent,
    EvcsModalComponent,
    EvcsPopoverComponent,
    FixDigitalOutputComponent,
    FixDigitalOutputModalComponent,
    FixDigitalOutputModalComponent,
    GridComponent,
    GridModalComponent,
    InfoComponent,
    LiveComponent,
    ModalComponentEvcsCluster,
    ModbusApiComponent,
    OfflineComponent,
    PickScheduleDateComponent,
    ProductionComponent,
    ProductionModalComponent,
    RedlightComponent,
    RedlightModalComponent,
    RepeatComponent,
    ScheduleComponent,
    SchedulewidgetComponent,
    SchedulewidgetModalComponent,
    SelfConsumptionComponent,
    SelfconsumptionModalComponent,
    SinglethresholdComponent,
    SinglethresholdModalComponent,
    StorageComponent,
    StorageModalComponent,
    SymmetricPeakshavingComponent,
    SymmetricPeakshavingModalComponent,
  ]
})
export class LiveModule { }
