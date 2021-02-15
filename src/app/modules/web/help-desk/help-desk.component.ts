import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HelpDeskModel } from 'src/app/_models/web.models';
import { WebService } from 'src/app/_services/web.service';
import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexOptions,
  ApexPlotOptions,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors:any;
  legend: ApexLegend;
  dataLabels:ApexDataLabels;
  options: ApexOptions,
  plotOptions: ApexPlotOptions,
};

@Component({
  selector: 'app-help-desk',
  templateUrl: './help-desk.component.html',
  styleUrls: ['./help-desk.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
  .second {
    height: 400px;
  }
  `]
})
export class HelpDeskComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() demo2: HelpDeskModel[] = [];

  HelpDeskTickets: HelpDeskModel[] = [];
  public Values: any[] = [];
  public Labels: any[] = [];
  public Total: number;
  IsData: boolean;

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private webService: WebService,
  ) {
    this.chartOptions = {
      series: this.Values as any [],
      chart: {
        type: "donut",
        width: "65%"
      },
      plotOptions:{
        pie:{
          donut:{   
            size: '60%',        
            labels:{
              show: true,
              value: {
                show: true,
              },
              name:{
                show: true,
              },
              total:{              
                show: true,
                showAlways: true,
                label:'Total',
                fontSize: "20px"
              }
            }
          }
        }
      },     
      labels: this.Labels as any[],
      responsive: [
        {
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            },
            plotOptions:{
              pie:{
                donut:{   
                  size: '100%',        
                  labels:{
                    show: true,
                    value: {
                      show: true,
                    },
                    name:{
                      show: true,
                    },
                    total:{              
                      show: true,
                      showAlways: true,
                      label:'Total',
                      fontSize: "20px"
                    }
                  }
                }
              }
            },    
          }
        }
      ],
      dataLabels:{
        formatter: function (val, opts) {
          return val
        },
        textAnchor: 'middle',
        distributed: true,
        enabled: false,
      },
      legend:{
        position:"left",
        width: 300,
        fontWeight: 900,
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          strokeColor: '#fff',
          fillColors: undefined,
          radius: 2,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0
        },
        itemMargin:{
          horizontal: 10,
          vertical: 5,
        }
      }
    };
  }

  ngOnInit(): void {
    this.getHelpDeskTickets();
  }

  ngOnChanges() {
    var Total = 0;
    this.Values = [];
    this.Labels = [];
    this.HelpDeskTickets = this.demo2;
    for(var i=0;i<this.demo2.length;i++){
      this.Values.push(this.demo2[i].Value);
      this.Labels.push(this.demo2[i].Category + ": " + this.demo2[i].Value);
      if(Total == 0){
        Total = this.demo2[i].Value;
      }
      else{
        Total = Total + this.demo2[i].Value;
      }
      this.Total = Total;
      this.IsData = true
    }
    this.chartOptions = {
      series: this.Values as any [],
      chart: {
        type: "donut",
        width: "65%"
      },
      plotOptions:{
        pie:{
          donut:{   
            size: '60%',        
            labels:{
              show: true,
              value: {
                show: true,
              },
              name:{
                show: true,
              },
              total:{              
                show: true,
                showAlways: true,
                label:'Total',
                fontSize: "20px"
              }
            }
          }
        }
      },     
      labels: this.Labels as any[],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 400
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      dataLabels:{
        formatter: function (val, opts) {
          return val
        },
        textAnchor: 'middle',
        distributed: true,
        enabled: false,
      },
      legend:{
        position:"left",
        width: 300,
        fontWeight: 900,
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          strokeColor: '#fff',
          fillColors: undefined,
          radius: 2,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0
        },
        itemMargin:{
          horizontal: 10,
          vertical: 5,
        }
      }
    };
  }

  getHelpDeskTickets() {
    this.spinner.show();
    var date  = new Date().getMonth();
    date = date + 1;
    var selectedMonth = date.toString();
    var selectedYear = new Date().getFullYear().toString();

    this.webService.getHelpDeskTickets(selectedMonth,selectedYear).subscribe(data => {
      if (data) {
        var Total = 0
        this.HelpDeskTickets = data;
        for(var i=0;i<data.length;i++){
          this.Values.push(data[i].Value);
          this.Labels.push(data[i].Category + ": " + data[i].Value);
          if(Total == 0){
            Total = data[i].Value;
          }
          else{
            Total = Total + data[i].Value;
          }
          this.Total = Total;
          this.IsData = true;
        }
      }
      this.spinner.hide();
    },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.toastr.error(err.error['Message'], 'Error');
      }
    );
  }
}
