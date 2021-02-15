import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { WebTrendSiteDataModel, WebTrendNAEPLinkDataModel, WebTrendNRCLinkDataModel, WebTrendTermDataModel, WebTrendResourceDataModel } from 'src/app/_models/web.models';
import { WebService } from 'src/app/_services/web.service';

@Component({
  selector: 'app-web-trend-report',
  templateUrl: './web-trend-report.component.html',
  styleUrls: ['./web-trend-report.component.scss']
})
export class WebTrendReportComponent implements OnInit {

  @Input() demo3: {
    WebTrendSiteData: WebTrendSiteDataModel[],
    WebTrendNAEPLinkData: WebTrendNAEPLinkDataModel[],
    WebTrendNRCLinkData: WebTrendNRCLinkDataModel[],
    WebTrendTermData: WebTrendTermDataModel[],
    WebTrendResourceData: WebTrendResourceDataModel[],
  };
  @Input() WebTrendlength: number;

  WebTrendData: {
    WebTrendSiteData: WebTrendSiteDataModel[],
    WebTrendNAEPLinkData: WebTrendNAEPLinkDataModel[],
    WebTrendNRCLinkData: WebTrendNRCLinkDataModel[],
    WebTrendTermData: WebTrendTermDataModel[],
    WebTrendResourceData: WebTrendResourceDataModel[],
  };
  length: number;

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private webService: WebService,
  ) { }

  ngOnInit(): void {   
    this.getMonths();
  }

  ngOnChanges() {
    this.WebTrendData = this.demo3;
    this.length = this.WebTrendlength;
  }

  getMonths() {
    this.spinner.show();

    var date  = new Date().getMonth();
    date = date + 1;
    var selectedMonth = date.toString();
    var selectedYear = new Date().getFullYear().toString();

    this.webService.getWebTrendReportData(selectedMonth,selectedYear).subscribe(data => {
      if (data) {
        this.WebTrendData = data;
        this.length = 0;
        if(this.WebTrendData.WebTrendSiteData.length > 0 || this.WebTrendData.WebTrendNAEPLinkData.length > 0 ||
          this.WebTrendData.WebTrendNRCLinkData.length > 0 || this.WebTrendData.WebTrendTermData.length > 0 || 
          this.WebTrendData.WebTrendResourceData.length > 0){
          this.length = 1;
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
