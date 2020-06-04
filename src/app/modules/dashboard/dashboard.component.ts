import { Component, OnInit } from '@angular/core';
import { CrudOperationsService } from 'src/app/services/crud-operations.service';

import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chartOptions: {};
  growthchartOptions: {};
  Highcharts = Highcharts;

  data = [];
  growthdata = [];

  constructor(private dataserver : CrudOperationsService) { }

  ngOnInit(): void {

    this.dataserver.getRequest(`memberdistribution`).subscribe( (data) => {

        data = new Array(data);
            
        for (let index = 0; index < data[0].length; index++) {
            
            this.data.push(

                {
                    name: data[0][index].department,
                    y: data[0][index].count
                }

            );

        }

        
        this.chartOptions = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Member Distribution'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: true
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Members',
                colorByPoint: true,
                data: this.data
            }]
        };

        HC_exporting(Highcharts);

        

    });


  }

}
