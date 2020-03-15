# Angular5

Running this POC:

```
npm install
ng serve
http://localhost:4200/
```

**ng-cli**:

```
npm install -g @angular/cli -> installs angular CLI

ng new project-name. -> scaffolds a new project

ng serve -> starts server on default port 4200

ng serve - portNo -> starts server on given port

ng test -> launches unit test cases

ng g c folder/name -> creates a new controller inside folder structure specified and also updates app.module with it

ng g s folder/name -> creates service. 's' is shortfrom of service here.
```

Note that services are created with @Injectable() so that they can be injected directly in constructors of controllers or other services.

Bootstrapping Angular: index.html is the starting point, which has the <app-root> (or as named) tag that points to main app component tag.

# Bindings

 https://coursetro.com/posts/code/108/Angular-5-Interpolation,-Property-Binding-&-Event-Binding-Tutorial

 Angular supports 4 types of bindings:

 1. String interpolation

Interpolation is a one way binding, value going from component to template for string values only. Eg. below, btnText is coming from underlying controller. 
```
<input type="submit" class="btn" value="{{ btnText }}">
```
 2. Property binding

Property binding: Angular evaluates an expression and assigns it some property of underlying HTML DOM element, component, service etc. This is also one way. Eg. below, btnText is coming from underlying controller. 
```
<input type="submit" class="btn" [value]="btnText">
```
3. Two way binding:

import **FormsModule** in app.module to enable 2 way data binding for form inputs. Then configure ngModel to a value coming from underlying component:
```
<input type="text" [(ngModel)]="newBugName">
```

4. Event Binding

See bug-tracker.compnent.html and Bug-edit component has :
```
<input type="button" value="Create New" (click)="onCreateClick()">

@Output()
    bugCreated : EventEmitter<Bug> = new EventEmitter<Bug>();

onCreateClick() : void {
        let newBug : Bug = this.bugStorage.addNew(this.newBugName);
        this.bugCreated.emit(newBug);
    }
```
On click of the button, onCreateClick() is called, which creates a new bug, 
and transmits an event (function marked with @Output) with the bug as data. 

In the parent component (and its html) catches the event like this:
```
<bug-edit (bugCreated)="onNewBugCreated($event)" ></bug-edit>

 onNewBugCreated(newBug : Bug){
    this.bugs = [...this.bugs, newBug];
  }
```

**Angular Modules and scopes**:

Instead of cramping everything into app.module.ts, create individual modules for say pipes or utility components, and include these modules in the app.module. 

Components have private scope, whereas services have global scope and can be injected anywhere. Hence component have to exported from the modules before importing their module into the app.module

(See how UtilsModule.ts exports various pipes, and is itself imported into the app.module)

**Importing and using 3rd party libraries**:

eg. moment.js (https://www.npmjs.com/package/angular-moment)
```
npm install angular-moment moment --save
then do import * as moment from ‘moment’
```

**HttpClient**

To make http requests to client, first import HttpModule as follows:
```
import { HttpModule } from '@angular/http';
```
Then write a service that makes GET/POST requests and returns an Observable. 

You may also map the observable to json or some other format.

This observable must be suscribed from the main component where data is actually required.

The Employee component of this POC shows how to make a GET call to the backend.

**Router**:

https://angular.io/guide/router

The Angular Router enables navigation from one view to the next as users perform application tasks.

Notice the following in app.module:

```
import { Routes, RouterModule } from '@angular/router';

routes = url + component mapping
```
In html, give the following along with links to various routes via menu bar:
```
<router-outlet></router-outlet>
```

**Pipes**
https://angular.io/guide/pipes

Transforming data in templates using build in pipes or custom pipes. Pipes also take optional arguments for fine tuning the results eg.
```
<p>The hero's birthday is {{ birthday | date:"MM/dd/yy" }} </p> or via binding:
<p>The hero's birthday is {{ birthday | date:format }} </p> where format is a member of component class
```

There are two categories of pipes: pure and impure. By default pipes are pure.

A pure pipe is either a change to a primitive input value (String, Number, Boolean, Symbol) or a changed object reference (Date, Array, Function, Object). Angular ignores changes within (composite) objects. It won't call a pure pipe if you change an input month, add to an input array, or update an input object property.

On the other hand, Angular executes an impure pipe during every component change detection cycle. An impure pipe is called often, as often as every keystroke or mouse-move.

**ngFor, click, [ngClass] example**
```
<ol>
        <li *ngFor="let bug of ( bugs | sort:sortBugBy:sortByDescending) ">
            <span class="bugname" 
                (click)="onBugClick(bug)"
                [ngClass]="{closed : bug.isClosed}"
            >{{bug.name | trimText:40}}</span>
            <div class="datetime">{{bug.createdAt | elapsed}}</div>
        </li>
</ol>
```

**@Input()**
```
@Input(‘data’).  //  a data-bound input property
bugs : IBug[] = [];

in html of parent containing component, this component is used as <bug-edit [data]= “bugs” ></bug-edit>
where bugs is member of containing component
```
@Input() and @Output help implement parent-child relatinship among components
@Input() in child and @Output in parent component

———————————

**Q.** How can components share data?

**Ans.** via events or via services.

**Transpiling** 
is the process of compiling one language to another. In angular, Traceur compiler converts Typescript into java script code for the browsers.

TS is not mandatory for writing code angular 2 onwards, but typescript makes things very easy for angular - eg. Decorators. Angular heavily uses decorators for marking Components, modules etc. Dependency injection also becomes very easy when using TS.

**Webpack**: To build and bundle the app:

Webpack is the module bundler used in angular2 onwards.

Below command creates following in dist folder: main.bundle,js, polyfil.bundle.js, main.html etc. The main.bundle is the main application code, polyfil is for browser inter-compatibilities.

```
ng build 
``` 

Ahead of time compilation:

If you run with prod/aot flag: 
```
ng build —prod
or
ng build -aot
```
 The size of the bundled js is lot smaller, on the hindsite, the latter build command takes longer time to bundle the application.

If you want to build and deploy in a single command, then do as:
```
ng build —prod —base-href=“url”
```

You can also deploy using github pages.

Given that your project is checked into github, run the following 2 commands:
```
ng build —prod —base-href=“url”
angular-cli-ghpages
```

## Unit Testing:

**ng test**: runs all unit test cases

Notice how we have mocked the dependency of bug-tracker component in the app.component.spect.ts

You can also import and inject the actual components/services/pipes etc.

Also see employee.component.spec.ts on how to mock a service present in the constructor of the component:
 providers: [ { provide: EmployeeService, useClass: FakeEmployeeService} ]
 
To mock http calls from the service, see employee.service.spect.ts:


# Misc Theory

**Component lifecycle**:
1. Create
2. Render
3. Create and render children
4. Check for bound data changes and re-render
5. Destroy

**Sample Component**:
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bug Tracker App';
  constructor(){}
  ngOnInit() {
  }
}
```
<app-root></app-root> invokes above component in an html.

**constructor vs ngOnInit()**

constructor is ES6/TS specific feature of the class itself, and not an angular feature. Angular doesn't control constructor. Use constructors for dependency injections.

ngOninit() on the other hand is purely to give us a signal that Angular has finished initialising the component. This phase includes the first pass at change detection against the properties that we may bind to the component itself - such as using an @Input decorator. In other words, @Input properties are available in ngOninit() but undefined inside the constructor.

Sequence of Angular lifecycle hooks:

Onchange() - OnInit() - Docheck() - AfterContentInit() - AfterContentChecked() - AfterViewInit() - AfterViewChecked() - OnDestroy()

**Evolution of angular**:

Angular 2 : replaced angular 1's $scope with Components. Based on Typescript, it supports object oriented programming.

No angular 3 due to misalignment of router package. Angular 2 was already using a router v3 library, so Google just skipped angular ver 3 altogether.

Angular 4: Slight imporvements like improved ngIf, ngfor etc

Angular 5: comes with angular CLI. Number, date, currency pipes updates. Router hooks. Build optimizer to make budled app smaller and faster.

Angular 1x versions were called 'angularjs', whereas angular 2x onwards versions are called simply 'angular'.

**Observable vs Promise**:

A Promise handles a single event when an async operation completes or fails. Event cancellation is not possible.

An Observable allows to pass zero or more events where the callback is called for each event.

Observable also has the advantage over Promise to be cancelable. If the result of an HTTP request to a server or some other expensive async operation isn't needed anymore, or timeout has to be handled, the Subscription of an Observable allows to cancel the subscription, while a Promise will eventually call the success or failed callback even when you don't need the notification or the result it provides anymore.

Observable provides operators like map, forEach, reduce, ... similar to an array

There are also powerful operators like retry(), or replay(), ... that are often quite handy.

**References**:

https://youtu.be/oa9cnWTpqP8

https://programmingwithmosh.com/angular/angular-4-tutorial/

https://angular.io/guide/cheatsheet

