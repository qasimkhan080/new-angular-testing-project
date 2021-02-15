import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Component, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MonthEnum, WebTabIdEnum } from 'src/app/_enum/web.enum';
import { HelpDeskModel, MonthModel, YearModel, WebTrendSiteDataModel, WebTrendNAEPLinkDataModel, WebTrendNRCLinkDataModel, WebTrendTermDataModel, WebTrendResourceDataModel } from 'src/app/_models/web.models';
import { TaskModel } from 'src/app/_models/web.models';
import { WebService } from 'src/app/_services/web.service';
import * as $ from "jquery";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @Output() demo: TaskModel[] = [];
  @Output() demo1: TaskModel[] = [];
  @Output() demo2: HelpDeskModel[] = [];
  @Output() demo3: {
    WebTrendSiteData: WebTrendSiteDataModel[],
    WebTrendNAEPLinkData: WebTrendNAEPLinkDataModel[],
    WebTrendNRCLinkData: WebTrendNRCLinkDataModel[],
    WebTrendTermData: WebTrendTermDataModel[],
    WebTrendResourceData: WebTrendResourceDataModel[],
  };
  @Output() WebTrendlength: number;

  monthList: MonthModel[] = [];
  yearList: YearModel[] = [];
  filterForm: FormGroup;
  apiResponse: TaskModel[] = [];
  PrivateSiteData: TaskModel[] = [];
  HelpDeskTickets: HelpDeskModel[] = [];
  WebTrendData:{
    WebTrendSiteData: WebTrendSiteDataModel[],
    WebTrendNAEPLinkData: WebTrendNAEPLinkDataModel[],
    WebTrendNRCLinkData: WebTrendNRCLinkDataModel[],
    WebTrendTermData: WebTrendTermDataModel[],
    WebTrendResourceData: WebTrendResourceDataModel[],
  };
  activeTab: number;
  length: number;

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private webService: WebService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getYearAndMonths();

    this.filterForm = this.fb.group({
      Year: this.fb.control(new Date().getFullYear()),
      Month: this.fb.control(new Date().getMonth() + 1),
      TabId: this.fb.control(WebTabIdEnum.PublicSites)
    });
    this.activeTab = 1;
  }

  setMonth(isNextMonth: boolean) {   
    const currentMonth: number = +(this.filterForm.get('Month').value);
    const currentYear: number = +(this.filterForm.get('Year').value);

    if (isNextMonth) {
      if (currentMonth == MonthEnum.December && this.yearList.find(y => y.Year > currentYear)) {
        this.filterForm.get('Year').patchValue(currentYear + 1);
        this.filterForm.get('Month').patchValue(1);
      }
      else if (currentMonth != MonthEnum.December) {
        this.filterForm.get('Month').patchValue(currentMonth + 1);
      }
      else {
        this.toastr.show('You can filter data only between January ' + this.yearList[0].Year + ' to December ' + this.yearList[(this.yearList.length - 1)].Year);
      }
    }
    else {
      if (currentMonth == MonthEnum.January && this.yearList.find(y => y.Year < currentYear)) {
        this.filterForm.get('Year').patchValue(currentYear - 1);
        this.filterForm.get('Month').patchValue(12);
      }
      else if (currentMonth != MonthEnum.January) {
        this.filterForm.get('Month').patchValue(currentMonth - 1);
      }
      else {
        this.toastr.show('You can filter data only between January ' + this.yearList[0].Year + ' to December ' + this.yearList[(this.yearList.length - 1)].Year);
      }
    }
    this.getPublicSiteData()
    this.getPrivateSiteData()
    this.getHelpDeskTickets()
    this.getWebTrendReportData()
  }

  getYearAndMonths() {
    this.spinner.show();
    this.webService.getYearAndMonths().subscribe(data => {
      if (data) {
        this.monthList = data?.Months || [];
        this.yearList = data?.Years || [];
      }
      this.spinner.hide();
    },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.toastr.error(err.error['Message'], 'Error');
      }
    );
  }

  getPublicSiteData(){  

    var selectedMonth = $("#Month").val();
    var selectedYear = $("#Year").val();
    
    this.webService.getWebData(selectedMonth,selectedYear).subscribe(data => {
      if (data) {  
        this.demo = data     
        this.apiResponse = data;
      }
      this.spinner.hide();
    },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.toastr.error(err.error['Message'], 'Error');
      }
    );
  }

  getPrivateSiteData(){  
  
    var selectedMonth = $("#Month").val();
    var selectedYear = $("#Year").val();

    this.webService.getPrivateData(selectedMonth,selectedYear).subscribe(data => {
      if (data) {       
        this.demo1 = data     
        this.PrivateSiteData = data;
      }
      this.spinner.hide();
    },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.toastr.error(err.error['Message'], 'Error');
      }
    );
  }

  getHelpDeskTickets() {

    var selectedMonth = $("#Month").val();
    var selectedYear = $("#Year").val();

    this.webService.getHelpDeskTickets(selectedMonth,selectedYear).subscribe(data => {
      if (data) {
        this.demo2 = data;
        this.HelpDeskTickets = data
      }
      this.spinner.hide();
    },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.toastr.error(err.error['Message'], 'Error');
      }
    );
  }

  getWebTrendReportData() {

    this.spinner.show();
    
    var selectedMonth = $("#Month").val();
    var selectedYear = $("#Year").val();

    this.webService.getWebTrendReportData(selectedMonth,selectedYear).subscribe(data => {
      if (data) {
        this.demo3 = data;
        this.WebTrendData = data;
        this.length = 0;
        this.WebTrendlength = 0;
        if(this.WebTrendData.WebTrendSiteData.length > 0 || this.WebTrendData.WebTrendNAEPLinkData.length > 0 ||
          this.WebTrendData.WebTrendNRCLinkData.length > 0 || this.WebTrendData.WebTrendTermData.length > 0 || 
          this.WebTrendData.WebTrendResourceData.length > 0){
          this.length = 1;
          this.WebTrendlength = 1;
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

  ChangeTab(TabId){
    this.activeTab = TabId;
  }
}
