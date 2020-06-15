import { Component, OnInit } from '@angular/core';
import { CrudOperationsService } from 'src/app/services/crud-operations.service';
import { DomSanitizer } from '@angular/platform-browser';
import { globworknumber/*, workethic, puntuality, teamwork, initiative, positivity*/ } from '../viewdetails/viewdetails.component';

import * as moment from 'moment-timezone';

import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';


@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.scss']
})
export class ViewprofileComponent implements OnInit {

  imgUrl:any;
  overallpercent:any;

  data = [];

  filedata;

  name:any;
  surname:any;
  dateofbirth:any;
  gender:any;
  email:any;
  mobile:any;
  address:any;

  chartOptions: {};
  Highcharts = Highcharts;

  saveAsBlob(){
    var blob = new Blob([this.filedata]);
    var url= window.URL.createObjectURL(blob);
    window.open(url);
  }

  constructor(private dataserver : CrudOperationsService,protected domSanitizer: DomSanitizer) 
  { 
    this.imgUrl = 'assets/img/NoProfile.jpg'; 

    this.dataserver.getRequest(`getlatestperformance/${globworknumber}`).subscribe( (performancedata) => { 

      this.overallpercent = ((performancedata[0].workethic + performancedata[0].puntuality + performancedata[0].teamwork + performancedata[0].initiative + performancedata[0].positivity) / 500) *100;
      
    });

  }

  ngOnInit(): void {

    this.dataserver.getRequest(`getlatestperegrineworkers/${globworknumber}`).subscribe( (data) => { 
        this.name = data[0].name;
        this.surname = data[0].surname;
        this.dateofbirth = data[0].name;
        this.gender = data[0].gender;
        this.email = 'ricardo@gmail.com';
        this.mobile = '123456789';
        this.address = data[0].address;

        let filearray = new Uint8Array(data[0].file.data);
        let fileblob = new Blob([filearray]);
        this.filedata = fileblob;

        //************************************************
        let TYPED_ARRAY = new Uint8Array(data[0].imgfile.data);
        //const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);

        //*********For out of range Error use******
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
          return data + String.fromCharCode(byte);
          }, '')//);
        
        let base64String = btoa(STRING_CHAR);

        this.imgUrl = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);

        //************************************************
    })


    let year = moment().tz("Africa/Johannesburg").year()

    this.dataserver.getRequest(`getperformancelogsdetailsIDpresentandpast/${globworknumber}/${year}`).subscribe( (performancedata) => {

        performancedata = new Array(performancedata);

        this.data.push(
        {
            name: 'Latest Performance',
            data: [performancedata[0][0].workethic, performancedata[0][0].puntuality, performancedata[0][0].teamwork, performancedata[0][0].initiative, performancedata[0][0].positivity],
            pointPlacement: 'on'
        });
            
        for (let index = 1; index < performancedata[0].length; index++) {
            
            this.data.push(

                {
                    name: `Previous Performance : ${performancedata[0][index].date}`,
                    data: [performancedata[0][index].workethic, performancedata[0][index].puntuality, performancedata[0][index].teamwork, performancedata[0][index].initiative, performancedata[0][index].positivity],
                    pointPlacement: 'on',
                    //color: '#D3D3D3'
                }

            );

        }



        this.chartOptions = {

            chart: {
              polar: true,
              type: 'line'
            },

            accessibility: {
                description: 'A spiderweb chart compares the allocated budget against actual spending within an organization. The spider chart has six spokes. Each spoke represents one of the 6 departments within the organization: sales, marketing, development, customer support, information technology and administration. The chart is interactive, and each data point is displayed upon hovering. The chart clearly shows that 4 of the 6 departments have overspent their budget with Marketing responsible for the greatest overspend of $20,000. The allocated budget and actual spending data points for each department are as follows: Sales. Budget equals $43,000; spending equals $50,000. Marketing. Budget equals $19,000; spending equals $39,000. Development. Budget equals $60,000; spending equals $42,000. Customer support. Budget equals $35,000; spending equals $31,000. Information technology. Budget equals $17,000; spending equals $26,000. Administration. Budget equals $10,000; spending equals $14,000.'
            },

            title: {
                text: 'Yearly Perfomance Score',
                x: -80
            },

            pane: {
                size: '80%'
            },

            xAxis: {
                categories: ['Work Ethic', 'Punctuality', 'Team Work', 'Initiative',
                    'Positivity'],
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

            series: this.data/*[{
                name: 'Current Performance',
                data: [workethic, puntuality, teamwork, initiative, positivity],
                pointPlacement: 'on'
            }, {
                name: 'Previous Performance',
                data: [90, 10, 80, 30, 50],
                pointPlacement: 'on'
            }]*/,

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
