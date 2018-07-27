import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from './utils/utils.module';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BugTrackerComponent } from './bug-tracker/bug-tracker.component';
import { BugDataService } from './service/bug-data.service';
import { BugEditComponent } from './views/bugEdit.component';
import { BugStatsComponent } from './views/bugStats.component';
import { ClosedCountPipe } from './pipes/closedCount.pipe';
import { AboutComponent } from './about/about/about.component';


const routes: Routes = [
  {
      path : '', //default route
      component: BugTrackerComponent
  },
  {
    path : 'about/:id',
    component: AboutComponent
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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UtilsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [BugDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
