import { Component, OnInit } from '@angular/core';
import { CrudOperationsService } from 'src/app/services/crud-operations.service';

import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chartOptions: {};
  Highcharts = Highcharts;

  data = [];

  constructor(private dataserver : CrudOperationsService) 
  {
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
                name: 'Departments',
                colorByPoint: true,
                data: this.data
            }]
        };

        

    });
  }

  ngOnInit(): void {

    


  }

}
