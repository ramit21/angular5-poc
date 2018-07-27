import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component , Input} from '@angular/core';
import { Bug } from './model/Bug';
//import { BugTrackerComponent } from './bug-tracker/bug-tracker.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockBugTrackerComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Bug Tracker App'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Bug Tracker App');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Bug Tracker App!');
  }));
});

//Mocked component dependency
@Component({
  selector:'bug-tracker',
  template: ''
})
class MockBugTrackerComponent {
 
}