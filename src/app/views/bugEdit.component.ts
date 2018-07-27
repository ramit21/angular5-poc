import { Component, Output, EventEmitter } from '@angular/core';
import { BugDataService } from '../service/bug-data.service';
import { Bug } from '../model/Bug';

@Component({
	selector : 'bug-edit',
	template : `
		<section class="edit">
			<label for="">Bug Name :</label>
			<input type="text" [(ngModel)]="newBugName">
			<input type="button" value="Create New" (click)="onCreateClick()">
		</section>
	`
})
export class BugEditComponent{
	
	newBugName : string = '';

	@Output()
	bugCreated : EventEmitter<Bug> = new EventEmitter<Bug>();

	constructor(private bugStorage : BugDataService){
	}

	onCreateClick() : void {
		let newBug : Bug = this.bugStorage.addNew(this.newBugName);
		//this.bugs = [...this.bugs, newBug]; instead we will emit bug creation as an event
		this.bugCreated.emit(newBug);
	}

}