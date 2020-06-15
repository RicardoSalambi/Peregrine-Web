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
//************************************************************
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


        this.growthchartOptions = {

            chart: {
            polar: true,
            type: 'line'
            },

            accessibility: {
                description: 'A spiderweb chart compares the allocated budget against actual spending within an organization. The spider chart has six spokes. Each spoke represents one of the 6 departments within the organization: sales, marketing, development, customer support, information technology and administration. The chart is interactive, and each data point is displayed upon hovering. The chart clearly shows that 4 of the 6 departments have overspent their budget with Marketing responsible for the greatest overspend of $20,000. The allocated budget and actual spending data points for each department are as follows: Sales. Budget equals $43,000; spending equals $50,000. Marketing. Budget equals $19,000; spending equals $39,000. Development. Budget equals $60,000; spending equals $42,000. Customer support. Budget equals $35,000; spending equals $31,000. Information technology. Budget equals $17,000; spending equals $26,000. Administration. Budget equals $10,000; spending equals $14,000.'
            },

            title: {
                text: 'Yearly Member Growth',
                x: -80
            },

            pane: {
                size: '80%'
            },

            xAxis: {
                categories: ['January', 'February', 'March', 'April','May','June','July','August','September','October','November','December'],
                tickmarkPlacement: 'on',
                lineWidth: 0
            },

            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0
            },

            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}pts</b><br/>'
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: true
            },
            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            },

            series: this.growthdata,

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            align: 'center',
                            verticalAlign: 'bottom',
                            layout: 'horizontal'
                        },
                        pane: {
                            size: '70%'
                        }
                    }
                }]
            }
            
        }
        HC_exporting(Highcharts);


    });






  }

}
