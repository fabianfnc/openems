import { AbstractHistoryChart } from '../abstracthistorychart';
import { ActivatedRoute } from '@angular/router';
import { Base64PayloadResponse } from 'src/app/shared/jsonrpc/response/base64PayloadResponse';
import { ChannelAddress, Edge, EdgeConfig, Service, Utils, Websocket } from '../../../shared/shared';
import { ChartOptions, Data, DEFAULT_TIME_CHART_OPTIONS, TooltipItem } from './../shared';
import { Component, Input, OnChanges } from '@angular/core';
import { debounceTime, delay, takeUntil } from 'rxjs/operators';
import { DefaultTypes } from 'src/app/shared/service/defaulttypes';
import { EnergyModalComponent } from './modal/modal.component';
import { format, isSameDay, isSameMonth, isSameYear } from 'date-fns';
import { formatNumber } from '@angular/common';
import { fromEvent, Subject } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { QueryHistoricTimeseriesDataResponse } from '../../../shared/jsonrpc/response/queryHistoricTimeseriesDataResponse';
import { QueryHistoricTimeseriesExportXlxsRequest } from 'src/app/shared/jsonrpc/request/queryHistoricTimeseriesExportXlxs';
import { TranslateService } from '@ngx-translate/core';
import * as FileSaver from 'file-saver';
import * as Chart from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'energy',
  templateUrl: './energy.component.html'
})
export class EnergyComponent extends AbstractHistoryChart implements OnChanges {

  canvas: any;
  ctx: any;

  private static readonly EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  private static readonly EXCEL_EXTENSION = '.xlsx';

  @Input() private period: DefaultTypes.HistoryPeriod;

  ngOnChanges() {
    // this.updateChart();
  };

  constructor(
    protected service: Service,
    protected translate: TranslateService,
    private route: ActivatedRoute,
    public modalCtrl: ModalController,
    private websocket: Websocket,
  ) {
    super(service, translate);
  }

  // EXPORT WILL MOVE TO MODAL WHEN KWH ARE READY

  /**
   * Export historic data to Excel file.
   */
  public exportToXlxs() {
    this.service.getCurrentEdge().then(edge => {
      // TODO the order of these channels should be reflected in the excel file
      let dataChannels = [
        new ChannelAddress('_sum', 'EssActivePower'),
        // Grid
        new ChannelAddress('_sum', 'GridActivePower'),
        // Production
        new ChannelAddress('_sum', 'ProductionActivePower'),
        // Consumption
        new ChannelAddress('_sum', 'ConsumptionActivePower')
      ];
      let energyChannels = [
        // new ChannelAddress('_sum', 'EssSoc'),
        // new ChannelAddress('_sum', 'GridBuyActiveEnergy'),
        // new ChannelAddress('_sum', 'GridSellActiveEnergy'),
        // new ChannelAddress('_sum', 'ProductionActiveEnergy'),
        // new ChannelAddress('_sum', 'ConsumptionActiveEnergy'),
        // new ChannelAddress('_sum', 'EssActiveChargeEnergy'),
        // new ChannelAddress('_sum', 'EssActiveDischargeEnergy')
      ];
      edge.sendRequest(this.websocket, new QueryHistoricTimeseriesExportXlxsRequest(this.service.historyPeriod.from, this.service.historyPeriod.to, dataChannels, energyChannels)).then(response => {
        let r = response as Base64PayloadResponse;
        var binary = atob(r.result.payload.replace(/\s/g, ''));
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
          view[i] = binary.charCodeAt(i);
        }
        const data: Blob = new Blob([view], {
          type: EnergyComponent.EXCEL_TYPE
        });

        let fileName = "Export-" + edge.id + "-";
        let dateFrom = this.service.historyPeriod.from;
        let dateTo = this.service.historyPeriod.to;
        if (isSameDay(dateFrom, dateTo)) {
          fileName += format(dateFrom, "dd.MM.yyyy");
        } else if (isSameMonth(dateFrom, dateTo)) {
          fileName += format(dateFrom, "dd.") + "-" + format(dateTo, "dd.MM.yyyy");
        } else if (isSameYear(dateFrom, dateTo)) {
          fileName += format(dateFrom, "dd.MM.") + "-" + format(dateTo, "dd.MM.yyyy");
        } else {
          fileName += format(dateFrom, "dd.MM.yyyy") + "-" + format(dateTo, "dd.MM.yyyy");
        }
        fileName += EnergyComponent.EXCEL_EXTENSION;
        FileSaver.saveAs(data, fileName);

      }).catch(reason => {
        console.warn(reason);
      })
    })
  }

  ngOnInit() {
    let timestamp = new Date(this.service.historyPeriod.from.toDateString()).toLocaleDateString('de');
    // timestamp.toLocaleString();
    console.log("timestamp", timestamp)

    // result for one week
    let result = {
      data: {
        "_sum/ProductionEnergy": [
          90, 80, 85, 65, 70, 72, 76
        ],
        "_sum/GridSellEnergy": [
          52, 48, 49, 46, 42, 50, 54
        ],
        "_sum/ChargeEnergy": [
          12, 10, 8, 13, 11, 12, 9
        ],
        "_sum/GridBuyEnergy": [
          1, 3, 2, 4, 1, 2, 3
        ],
        "_sum/DischargeEnergy": [
          9, 11, 12, 14, 16, 12, 11
        ],
      },
      timestamps: [
        "2020-08-09T00:00:00Z",
        "2020-08-10T00:00:00Z",
        "2020-08-11T00:00:00Z",
        "2020-08-12T00:00:00Z",
        "2020-08-13T00:00:00Z",
        "2020-08-14T00:00:00Z",
        "2020-08-15T00:00:00Z",
      ]
    }

    let chartLabels = [];

    result.timestamps.forEach(timestamp => {
      chartLabels.push(new Date(timestamp).toLocaleDateString())
      // .toISOString().substring(0, 10));
    })

    let channels = []
    let resolution = 5



    let chartDatasets = [];

    let directConsumption = [];
    result.data["_sum/ProductionEnergy"].forEach((value, index) => {
      directConsumption.push(value - result.data["_sum/GridSellEnergy"][index] - result.data["_sum/ChargeEnergy"][index]);
    })

    chartDatasets.push({
      label: "Direktverbrauch",
      backgroundColor: 'rgba(128,128,0,1)',
      data: directConsumption,
      stack: "Stack 0"
    })

    chartDatasets.push({
      label: "Beladung",
      backgroundColor: 'rgba(0,223,0,1)',
      data: result.data["_sum/ChargeEnergy"],
      stack: "Stack 0"
    })

    chartDatasets.push({
      label: "Netzeinspeisung",
      backgroundColor: 'rgba(0,0,200,1)',
      data: result.data["_sum/GridSellEnergy"],
      stack: "Stack 0"
    })

    chartDatasets.push({
      label: "Direktverbrauch",
      backgroundColor: 'rgba(128,128,0,1)',
      data: directConsumption,
      stack: "Stack 1"
    })

    chartDatasets.push({
      label: "Entladung",
      backgroundColor: 'rgba(200,0,0,1)',
      data: result.data["_sum/DischargeEnergy"],
      stack: "Stack 1"
    })

    chartDatasets.push({
      label: "Netzbezug",
      backgroundColor: 'rgba(0,0,0,1)',
      data: result.data["_sum/GridBuyEnergy"],
      stack: "Stack 1"
    })


    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: chartLabels,
        datasets: chartDatasets
      },
      options: {
        scales: {
          xAxes: [{
            stacked: true,
            time: {
              unit: 'day'
            }
          }],
        }
      }
    });
    this.subscribeChartRefresh()
  }

  ngOnDestroy() {
    this.unsubscribeChartRefresh()
  }

  protected updateChart() {
    let labels = ["1900", "1902", "1903", "1337"];
    let datasets = [
      {
        label: "Afghanistan",
        backgroundColor: "#3e95cd",
        data: [1133, 1221, 1783, 2478],
        hidden: false,
        datalabels: {
          align: 'end',
          anchor: 'start'
        }
      }, {
        label: "Europe",
        backgroundColor: "#8e5ea2",
        data: [1408, 1547, 1675, 1734],
        hidden: false,
        datalabels: {
          align: 'end',
          anchor: 'center'
        }
      }
      , {
        label: "Asia",
        backgroundColor: "#8e5ea2",
        data: [1208, 1347, 1475, 1534],
        hidden: false,
        datalabels: {
          align: 'end',
          anchor: 'end'
        }
      }
    ];
    this.labels = labels;
    this.datasets = datasets;
    let options = <ChartOptions>Utils.deepCopy(DEFAULT_TIME_CHART_OPTIONS);
    this.options = options;
  }

  protected getChannelAddresses(edge: Edge, config: EdgeConfig): Promise<ChannelAddress[]> {
    return new Promise((resolve) => {
      if (edge.isVersionAtLeast('2018.8')) {
        let result: ChannelAddress[] = [];
        config.widgets.classes.forEach(clazz => {
          switch (clazz.toString()) {
            case 'Grid':
              result.push(new ChannelAddress('_sum', 'GridActivePower'));
              break;
            case 'Consumption':
              result.push(new ChannelAddress('_sum', 'ConsumptionActivePower'));
              break;
            case 'Storage':
              result.push(new ChannelAddress('_sum', 'EssSoc'))
              result.push(new ChannelAddress('_sum', 'EssActivePower'));
              break;
            case 'Production':
              result.push(
                new ChannelAddress('_sum', 'ProductionActivePower'),
                new ChannelAddress('_sum', 'ProductionDcActualPower'));
              break;
          };
          return false;
        });
        resolve(result);

      } else {
        this.service.getConfig().then(config => {
          let ignoreIds = config.getComponentIdsImplementingNature("FeneconMiniConsumptionMeter");
          ignoreIds.push.apply(ignoreIds, config.getComponentIdsByFactory("io.openems.impl.device.system.asymmetricsymmetriccombinationess.AsymmetricSymmetricCombinationEssNature"));

          // TODO: remove after full migration
          let result: ChannelAddress[] = [];

          // Ess
          let asymmetricEssChannels = this.getAsymmetric(config.getComponentIdsImplementingNature("AsymmetricEssNature"), ignoreIds);
          if (asymmetricEssChannels.length > 0) {
            // this is an AsymmetricEss Nature
            result.push.apply(result, asymmetricEssChannels);
          } else {
            // this is a SymmetricEss Nature
            result.push.apply(result, this.getSymmetric(config.getComponentIdsImplementingNature("SymmetricEssNature"), ignoreIds));
          }

          // Chargers
          result.push.apply(result, this.getCharger(config.getComponentIdsImplementingNature("ChargerNature"), ignoreIds));

          // Meters
          let asymmetricMeterIds = config.getComponentIdsImplementingNature("AsymmetricMeterNature");
          result.push.apply(result, this.getAsymmetric(asymmetricMeterIds, ignoreIds));
          let symmetricMeterIds = config.getComponentIdsImplementingNature("SymmetricMeterNature").filter(id => !asymmetricMeterIds.includes(id));
          result.push.apply(result, this.getSymmetric(symmetricMeterIds, ignoreIds));

          resolve(result);
        })
      }
    })
  }

  protected setLabel() {
    // let translate = this.translate;
    // let options = <ChartOptions>Utils.deepCopy(DEFAULT_TIME_CHART_OPTIONS);

    // console.log("JAWOLLJA")
    // options.scales.yAxes[0].id = "yAxis1"
    // options.scales.yAxes[0].scaleLabel.labelString = "kWh";
    // options.scales.yAxes[0].scaleLabel.padding = -2;
    // options.scales.yAxes[0].scaleLabel.fontSize = 11;
    // options.scales.yAxes[0].ticks.padding = -5;
    // options.tooltips.callbacks.label = function (tooltipItem: TooltipItem, data: Data) {
    //   let label = data.datasets[tooltipItem.datasetIndex].label;
    //   let value = tooltipItem.yLabel;
    //   return label + ": " + formatNumber(value, 'de', '1.0-2') + " kW";
    // }
    // this.options = options;
  }

  private getAsymmetric(ids: string[], ignoreIds: string[]): ChannelAddress[] {
    let result: ChannelAddress[] = [];
    for (let id of ids) {
      if (ignoreIds.includes(id)) {
        continue;
      }
      result.push.apply(result, [
        new ChannelAddress(id, 'ActivePowerL1'),
        new ChannelAddress(id, 'ActivePowerL2'),
        new ChannelAddress(id, 'ActivePowerL3'),
      ]);
    }
    return result;
  }

  private getSymmetric(ids: string[], ignoreIds: string[]): ChannelAddress[] {
    let result: ChannelAddress[] = [];
    for (let id of ids) {
      if (ignoreIds.includes(id)) {
        continue;
      }
      result.push.apply(result, [
        new ChannelAddress(id, 'ActivePower'),
      ]);
    }
    return result;
  }

  private getCharger(ids: string[], ignoreIds: string[]): ChannelAddress[] {
    let result: ChannelAddress[] = [];
    for (let id of ids) {
      if (ignoreIds.includes(id)) {
        continue;
      }
      result.push.apply(result, [
        new ChannelAddress(id, 'ActualPower'),
      ]);
    }
    return result;
  }


  public getChartHeight(): number {
    return window.innerHeight / 2;
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: EnergyModalComponent,
    });
    return await modal.present();
  }
}