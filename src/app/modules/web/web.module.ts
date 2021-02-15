import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebLayoutComponent } from './web-layout/web-layout.component';
import { HomeComponent } from './home/home.component';
import { SafePipeModule } from 'src/app/_pipes/safe.pipe';
import { WebHeaderComponent } from './web-header/web-header.component';
import { PublicSitesComponent } from './public-sites/public-sites.component';
import { PrivateSitesComponent } from './private-sites/private-sites.component';
import { HelpDeskComponent } from './help-desk/help-desk.component';
import { WebTrendReportComponent } from './web-trend-report/web-trend-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { NgApexchartsModule } from "ng-apexcharts";

const webRoutes: Routes = [{
    path: '',
    component: WebLayoutComponent,
    children: [
        { 
            path: 'home', 
            component: HomeComponent,
            children:[
                { path: 'help-desk', component: HelpDeskComponent }
            ]
        },
        { 
            path: '**',  
            redirectTo: 'home',
        },
    ]
}];

@NgModule({

    declarations: [
        WebLayoutComponent,
        HomeComponent,
        WebHeaderComponent,
        PublicSitesComponent,
        PrivateSitesComponent,
        HelpDeskComponent,
        WebTrendReportComponent,
    ],

    imports: [
        CommonModule,
        SafePipeModule,
        FormsModule, 
        ReactiveFormsModule,
        NgApexchartsModule,
        ChartsModule,
        RouterModule.forChild(webRoutes),
    ],

    schemas: [],

})

export class WebModule { }
