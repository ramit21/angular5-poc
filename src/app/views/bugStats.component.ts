import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Bug } from '../model/Bug';

@Component({
	selector : 'bug-stats',
	changeDetection : ChangeDetectionStrategy.OnPush,
	template : `
		<div>{{getCurrentTime()}}</div>
		<section class="stats">
			<span class="closed">{{ bugs | closedCount }}</span>
			<span> / </span>
			<span>{{bugs.length}}</span>
		</section>
	`
})
export class BugStatsComponent{

	@Input('data')
	bugs : Bug[] = [];

	getCurrentTime(){
		return new Date();
	}
	
}