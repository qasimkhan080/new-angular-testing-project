import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './account-layout/account-layout.component';


const accountRoutes: Routes = [

];

@NgModule({

    declarations: [
        AccountLayoutComponent,
    ],

    imports: [
        CommonModule,
        RouterModule.forChild(accountRoutes)
    ],

    schemas: [],

})

export class AccountModule { }
