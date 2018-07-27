import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BugTrackerComponent } from './bug-tracker.component';
import { Component, Input, Pipe} from '@angular/core';
import { Bug } from '../model/Bug';
import { BugDataService } from '../service/bug-data.service';
import { UtilsModule } from '../utils/utils.module';

describe('BugTrackerComponent', () => {
  let component: BugTrackerComponent;
  let fixture: ComponentFixture<BugTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugTrackerComponent, 
                      MockBugStatsComponent, //Define mocks of components being used
                      MockBugEditComponent
                    ],
        providers:  [
          BugDataService    //Actual Service being used
        ],
        imports: [
          UtilsModule     //Import helper module instead of mocking each and every pipe
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    //create initial data
    let newBug = new Bug(1, 'SecondBug');
    component.bugs = [newBug];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test bugTracker operations', () => {
    let newBug = new Bug(2, 'SecondBug');
    component.onNewBugCreated(newBug);
    expect(component.bugs.length).toEqual(2);
    component.onBugClick(newBug);
    expect(component.bugs[1].isClosed).toBeTruthy();
    component.onRemoveClosedClick();
    expect(component.bugs.length).toEqual(1);
    expect(component.bugs[0].isClosed).toBeFalsy();
  });
});

//Mocked component dependencies
@Component({
  selector:'bug-stats',
  template: ''
})
class MockBugStatsComponent {
  @Input('data')        //important to mock data here
	bugs : Bug[] = [];
}

@Component({
  selector:'bug-edit',
  template: ''
})
class MockBugEditComponent {
  @Input('data')
	bugs : Bug[] = [];
}

