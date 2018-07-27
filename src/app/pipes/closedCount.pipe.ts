import { Pipe, PipeTransform } from '@angular/core';
import { Bug } from '../model/Bug';

@Pipe({
	name: 'closedCount',
	pure : true
})
export class ClosedCountPipe implements PipeTransform {
	transform(bugs: Bug[]): number {
		return bugs.reduce((prevResult, bug) => bug.isClosed ? ++prevResult : prevResult, 0);
	}
}