import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SafePipeModule } from 'src/app/_pipes/safe.pipe';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';


const adminRoutes: Routes = [

];

@NgModule({

    declarations: [
        AdminLayoutComponent,
    ],

    imports: [
        CommonModule,
        SafePipeModule,
        RouterModule.forChild(adminRoutes)
    ],

    schemas: [],

})

export class AdminModule { }
