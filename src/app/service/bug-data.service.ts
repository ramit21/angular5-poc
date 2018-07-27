import { Injectable } from '@angular/core';
import { Bug } from '../model/Bug';

@Injectable()
export class BugDataService {
  private storage = window.localStorage;
  private currentBugId = 0;  //Unique identifier for stored bugs
  
  constructor() { }

  getAll() : Bug[]{
		let result : Bug[] = [];
		for(let index = 0; index < this.storage.length; index++){
			let rawData = this.storage.getItem(this.storage.key(index)),
			bug = JSON.parse(rawData);
			this.currentBugId = this.currentBugId > bug.id ? this.currentBugId : bug.id;
			result.push(bug);
		}
		return result;
	}
	
	remove(bug : Bug) : void{
		this.storage.removeItem(bug.id.toString());
	}

	toggle(bug : Bug) : Bug {
		bug.isClosed = !bug.isClosed;
		bug = this.save(bug);
		return bug;
	}

	addNew(bugName : string) : Bug {
    let newBug = new Bug(++this.currentBugId, bugName)
		return this.save(newBug);
	}
  
  private save(bug : Bug) : Bug {
		this.storage.setItem(bug.id.toString(), JSON.stringify(bug));
		return bug;
  }

}
