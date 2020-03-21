import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from './utils/utils.module';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BugTrackerComponent } from './bug-tracker/bug-tracker.component';
import { BugDataService } from './service/bug-data.service';
import { EmployeeService } from './service/employee.service';
import { BugEditComponent } from './views/bugEdit.component';
import { BugStatsComponent } from './views/bugStats.component';
import { ClosedCountPipe } from './pipes/closedCount.pipe';
import { AboutComponent } from './about/about/about.component';
import { EmployeeComponent } from './employee/employee.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpModule } from '@angular/http';

const routes: Routes = [
  {
      path : '', //default route
      component: BugTrackerComponent
  },
  {
    path : 'employee',
    component: EmployeeComponent
  },
  {
    path : 'about/:id',
    component: AboutComponent
  },
  {
    path : '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BugTrackerComponent,
    BugEditComponent,
    BugStatsComponent,
    ClosedCountPipe,
    AboutComponent,
    EmployeeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UtilsModule,
    RouterModule.forRoot(routes),
    HttpModule
  ],
  exports: [RouterModule],
  providers: [BugDataService, EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
