import { HttpErrorResponse } from '@angular/common/http';
import { Input, OnInit } from "@angular/core";
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TaskModel } from 'src/app/_models/web.models';
import { WebService } from 'src/app/_services/web.service';

@Component({
  selector: 'app-private-sites',
  templateUrl: './private-sites.component.html',
  styleUrls: ['./private-sites.component.scss']
})
export class PrivateSitesComponent  implements OnInit {

  @Input() demo1: TaskModel[] = [];

  PrivateSiteData: TaskModel[] = [];
  IsData: boolean;
  startPage : Number;
  paginationLimit:Number; 

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private webService: WebService,
  ) { }

  ngOnInit(): void {   
   
    this.getMonths();
    this.startPage = 0;
    this.paginationLimit = 1;
  }

  ngOnChanges() {
    this.PrivateSiteData  = this.demo1;
    this.IsData = true
  }

  getMonths() {
 
    this.spinner.show();
    var date  = new Date().getMonth();
    date = date + 1;
    var selectedMonth = date.toString();
    var selectedYear = new Date().getFullYear().toString();

    this.webService.getPrivateData(selectedMonth,selectedYear).subscribe(data => {
      if (data) {
      
        this.PrivateSiteData = data;
        this.demo1 = data;
        this.IsData = true;
      }
      this.spinner.hide();
    },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.toastr.error(err.error['Message'], 'Error');
      }
    );
  }

  visibleIndex = -1;

  showMoreItems(ind)
   {
      this.paginationLimit = Number(this.paginationLimit) + 1; 
      if (this.visibleIndex === ind) {
        this.visibleIndex = -1;
      } else {
        this.visibleIndex = ind;
      }       
   }
   showLessItems(ind)
   {
     this.paginationLimit = Number(this.paginationLimit) - 1;
     if (this.visibleIndex === ind) {
      this.visibleIndex = -1;
    } else {
      this.visibleIndex = ind;
    }
   }
}
