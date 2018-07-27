import { Component, OnInit } from '@angular/core';
import { BugDataService } from '../service/bug-data.service';
import { Bug } from '../model/Bug';

@Component({
  selector: 'bug-tracker',
  templateUrl: './bug-tracker.component.html',
  styleUrls: ['./bug-tracker.component.css']
})
export class BugTrackerComponent implements OnInit {
  title = 'Bug Tracker';
  bugs : Bug[] = [];

  constructor(private bugStorage : BugDataService){
		
	}
  
  ngOnInit() {
    this.bugs = this.bugStorage.getAll();
  }

  onNewBugCreated(newBug : Bug){
		this.bugs = [...this.bugs, newBug];
  }

  onBugClick(bugToToggle : Bug) : void {
    //update storage
    let toggledBug = this.bugStorage.toggle(bugToToggle);
    //now update the view
		this.bugs = this.bugs.map(bug => bug === bugToToggle ? toggledBug : bug);
  }
  
  onRemoveClosedClick() : void {
    //update the storage
		this.bugs
			.filter(bug => bug.isClosed)
			.forEach(bugToRemove => this.bugStorage.remove(bugToRemove));
    //now update the view
		this.bugs = this.bugs.filter(bug => !bug.isClosed);
	}

}
