import { HttpErrorResponse } from '@angular/common/http';
import { Input, OnInit } from "@angular/core";
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TaskModel } from 'src/app/_models/web.models';
import { WebService } from 'src/app/_services/web.service';

@Component({
  selector: 'app-public-sites',
  templateUrl: './public-sites.component.html',
  styleUrls: ['./public-sites.component.scss'],
})

export class PublicSitesComponent implements OnInit {

  @Input() demo: TaskModel[] = [];

  apiResponse: TaskModel[] = [];

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private webService: WebService,
  ) { }

  ngOnInit(): void {   
    this.getMonths();
  }

  ngOnChanges() {
    this.apiResponse = this.demo;
  }

  getMonths() {
    this.spinner.show();
    var date  = new Date().getMonth();
    date = date + 1;
    var selectedMonth = date.toString();
    var selectedYear = new Date().getFullYear().toString();

    this.webService.getWebData(selectedMonth,selectedYear).subscribe(data => {
      if (data) {
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
}
