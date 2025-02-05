# Angular5

Running this POC:

```
npm install
ng serve
http://localhost:4200/
```

## ng-cli

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
@Injectable(provider = root) is used for singleton services that are used across the application's component tree, where as services with just 
@Injectable() get new instance created, everytime a component where the service is injected gets created (Hierarchial dependency injection).

Bootstrapping Angular: index.html is the starting point, which has the <app-root> (or as named) tag that points to main app component tag.

## Bindings

 https://coursetro.com/posts/code/108/Angular-5-Interpolation,-Property-Binding-&-Event-Binding-Tutorial

 Angular supports 4 types of bindings:

 1. String interpolation

Interpolation is a one way binding, value going from component to template for string values only. Eg. below, btnText is coming from underlying controller. 
```
<input type="submit" class="btn" value="{{ btnText }}">
```

Note that interpolation is a sytactical sugar for property binding only as shown in 2 below. So for string values, interpolations can be prefered, for others, use property binding.

 2. Property binding

Property binding: This is also one way. Eg. below, btnText is coming from underlying controller. 
```
<input type="submit" class="btn" [value]="btnText">
```
**HTML vs DOM binding:**

Note that you can do binding like above only for properties of DOM object, and not for to an attribute of html element. For the latter, you need to use attr as shown below. For eg. if you want to bind the colspan attribute of td html element, then you need to do this:

```
<td [attr.colspan]="colSpan">
```

3. Two way binding:

import **FormsModule** in app.module to enable 2 way data binding for form inputs. Then configure **ngModel** to a value coming from underlying component:
```
<input type="text" [(ngModel)]="newBugName">
```

4. Event Binding

Bind HTML events to component functions:

```
<input type="button" value="Create New" (click)="onCreateClick()">
```

## HttpClient

To make http requests to client, first import HttpModule as follows:
```
import { HttpModule } from '@angular/http';
```
Then write a service that makes GET/POST requests and returns an Observable. 

You may also map the observable to json or some other format.

This observable must be suscribed from the main component where data is actually required.

The Employee component of this POC shows how to make a GET call to the backend.

**Optimistic vs pessimistic updates:** Optimistic update: when you call the http api, dont wait for the response, and update the UI immediately to give fast update to the user. In case of an error, in the error handler of the api call, you prepare to rollback the changes done to the UI previously.

## Router

Router helps implement in SPA in true sense. In legacy applications, you would give < a href="url" >, but this would cause lag as html is downloaded everytime you move through the links. Whereas in SPA, a single page is downloaded and as you move between routes, only the content to be rendered is downloaded from server. Instead of href, use routerLink.

The Angular Router enables navigation from one view to the next as users perform application tasks.

Steps to enable routing:

**Step 1**: app.module
```
import { Routes, RouterModule } from '@angular/router';

routes = url + component mapping
```
**Step 2**: Add a router outlet in index.html. When angular sees this directive, it renders the component associated with the current route after <router-outlet></router-outlet> tag (and not inside it)
```
<router-outlet></router-outlet>
```
**Step 3**: Add links.

See app.module for router links to different components. Order of the routes is important. Hence keep the default route handling at the end.
```
@NgModule({
   imports: [
    RouterModule.forRoot(routes)
    ...
```

Route paramters: Note that paramters passed via routes are 'observables' and must be suscribed to access the value.

You can invoke routes from html of components (like changing route on button click etc.) in following ways:

```
<a routerLink="/posts">posts</a>

or, this way when passing paramters:
<a [routerLink]="['/posts/', post.id]">

or, instead of paramters, you can also pass query params:
<a routerLink="/posts" [queryParams]="{page:1,size:10}">posts</a>

Query params can then be read using :
this.route.paramMap.suscribe();
this.route.snapshot.paramMap.get('page');
```

## Pipes
Used for transforming data in templates. Pipes also take optional arguments for fine tuning the results eg.
```
<p>The hero's birthday is {{ birthday | date:"MM/dd/yy" }} </p> or via binding:
<p>The hero's birthday is {{ birthday | date:format }} </p> where format is a member of component class
```

There are two categories of pipes: pure and impure. By default pipes are pure.

A pure pipe is only called when Angular detects a change in the value or the parameters passed to a pipe.

An impure pipe is called for every change detection cycle no matter whether the value or parameter(s) changes. These changes include change in array object or composite object contents.

You can create customer pipes as well - examples included in the repo. eg.
```
@Pipe({
  name: 'examplePurePipe',
  pure: true // This is the default
})
export class ExamplePurePipe implements PipeTransform {
  transform(value: any): any {
    // transformation logic
  }
}
```

## Angular Directives
Directives work in 2 way binding mode. As the component value changes, the html dom is re-rendered as per the directive used. You can also create your custom directives using @Directives which take a selector as a parameter.

Some common Angular provided directives:

ngIf: render the current element only when the if condition is satisfied. eg.
```
<div *ngIf="courses.length == 0"> ... </div>
```

ngSwitchCase:
```
<div [ngSwitch]="mySwitch">
    <div *ngSwitchCase="'abc'> ......  </div>
    <div *ngSwitchCase="'xyz'> ......  </div>
    <div *ngSwitchDef> ......  </div>
</div>
```

ngForm: Angular forms

hidden:
```
<div [hidden] = "courses.length == 0"> ... </div>
```

ngFor and ngClass example below.
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

The leading asterix used before directives indicates angular to rewrite the containing div inside a ng-template tag. for eg: the ngIf example shared above gets converted to:

```
<ng-template [ngIf]="courses.length > 0">
  <div> ...  <div>
 </ng-template> 
```

You can not use ng-template directly, as angular will encapsulate this tag into another ng-template tag. Solution is to use ng-container. Read this for more information: https://www.freecodecamp.org/news/everything-you-need-to-know-about-ng-template-ng-content-ng-container-and-ngtemplateoutlet-4b7b51223691/

## Public Component API
Pass input state to a component / get an output event from the component.

1. @Input: used to pass **state** from parent component to the child component.

```
@Input(‘data’) //data is an alias for childBugs
childBugs : IBug[] = [];

In html of parent containing component, this component is used as 

<bug-edit [data]= “parentBugs” ></bug-edit>

where “parentBugs” is member of containing component
```

2. @Output: used to pass **events** (with or without state) to the containing parent component using EventEmmiter.

See bug-tracker child component has :
```
html:

<input type="button" value="Create New" (click)="onCreateClick()">

component:

@Output()
    bugCreated : EventEmitter<Bug> = new EventEmitter<Bug>();

onCreateClick() : void {
        let newBug : Bug = this.bugStorage.addNew(this.newBugName);
        this.bugCreated.emit(newBug);
    }
```
On click of the button, onCreateClick() is called, which creates a new bug, 
and transmits an event (function marked with @Output) with the bug as data. 

In the parent component (and its html) the event is caught like this:
```
html:
<bug-edit (bugCreated)="onNewBugCreated($event)" ></bug-edit>

component:
 onNewBugCreated(newBug : Bug){
    this.bugs = [...this.bugs, newBug];
  }
```

## Webpack
Webpack is build optimisation tool. It packages our code into bundles and then optimises the bundled code.
```
ng build 
``` 
Above command creates following in dist folder, and injects reference to these in our index.html (you can see this by doing view source on the browser): 
1. main.bundle.js: main application code including templates. 
2. polyfil.bundle.js: browser inter-compatibilities. 
3. styles.bundle.js: all stylesheets.
4. vendor.bundle.js: 3rd party libraries.
5. inline.bundle.js: 

Ahead of time compilation:

If you run with prod/aot flag: 
```
ng build —prod
or
ng build -aot
```
 The size of the bundled js is lot smaller and the browser load time is less, on the hindsite, the aot compilation takes longer time to bundle the application.

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

**HMR**: Hot Module Replacement is webpack's feature that ensures that if you change the source code, the webpack automatically updates the bundles and dispatches them to the browser. Hence when you change the code at time of dev, no need to refresh the browser.

## Unit Testing:

**ng test**: runs all unit test cases

Notice how we have mocked the dependency of bug-tracker component in the app.component.spect.ts

You can also import and inject the actual components/services/pipes etc.

Also see employee.component.spec.ts on how to mock a service present in the constructor of the component:
 providers: [ { provide: EmployeeService, useClass: FakeEmployeeService} ]
 
To mock http calls from the service, see employee.service.spect.ts:


## Misc Theory

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

Angular emulates 'shadow DOM' by encapsulating the style given in the styles-url or directly styles, so that it does not leak to the outside world.

**constructor vs ngOnInit()**

constructor is ES6/TS specific feature of the class itself, and not an angular feature. Angular doesn't control constructor. Use constructors for dependency injections.

ngOninit() on the other hand is purely to give us a signal that Angular has finished initialising the component. This phase includes the first pass at change detection against the properties that we may bind to the component itself - such as using an @Input decorator. In other words, @Input properties are available in ngOninit() but undefined inside the constructor.

Sequence of Angular lifecycle hooks:

Onchange() - OnInit() - Docheck() - AfterContentInit() - AfterContentChecked() - AfterViewInit() - AfterViewChecked() - OnDestroy()

**Observable vs Promise**:

Promises are eager, whereas observables are lazy. Nothing happens from functions returning observables, unless you subscribe to them. On the other hand, as soon as you create a promise, the code gets executed.

A Promise handles a single event when an async operation completes or fails. Event cancellation is not possible. Observables on the other hand are cancellable.

Observable provides operators like map, forEach, reduce, ... (similar to an array) which are very helpful on operting on the data being returned. Reactive Programming based operators like retry(n), or replay(), ... are used to replay in case of failure. toPromise() operator can be used to convert an observable to a promise.

One can also suscribe to multiple observables, something not possible with a promise.

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

**Typescript datatypes**:
```
let a: number;
let b: boolean;
let c: string;
let d: any;
let e: number[] = [1,2,3];
let f: any[] = [1, true, 'a'];
const colRed = 0; //constants

enum Color {Red=0, Green=1, Purple=2};
let col = Color.Green;
```
-----------------

**Q.** How can components share data?

**Ans.** 1. events 2. via services 3. NgRx

**Transpiling** 
is the process of compiling one language to another. In angular, Traceur compiler converts Typescript into java script code for the browsers. Typescript is a superset of javascript with features that modern browsers cannot understand directly.

TS is not mandatory for writing code angular 2 onwards, but typescript makes things very easy for angular - eg. Decorators. Angular heavily uses decorators for marking Components, modules etc. Dependency injection also becomes very easy when using TS.

**Evolution of angular**:

Angular 2 : replaced angular 1's $scope with Components. Based on Typescript, it supports object oriented programming.

No angular 3 due to misalignment of router package. Angular 2 was already using a router v3 library, so Google just skipped angular ver 3 altogether.

Angular 4: Slight imporvements like improved ngIf, ngfor etc

Angular 5: comes with angular CLI. Number, date, currency pipes updates. Router hooks. Build optimizer to make budled app smaller and faster.

Angular 1x versions were called 'angularjs', whereas angular 2x onwards versions are called simply 'angular'.

**API call retry**:

Use retryWhen (part of RxJs) which retries api call in case of failure, and supports delay between each retry

**Subject**:

The Subjects (part of RxJs) are special observable which acts as both observer & observable. They allow us to emit new values to the observable stream using the next method. 
```
import { Subject } from "rxjs"
@Component({...
    subject$ = new Subject();
     this.subject$.subscribe(val => {
      console.log(val);
    });
    this.subject$.next("1");
    this.subject$.next("2");
    this.subject$.complete();
```

Another important distinction between observable & subject is that subjects are multicast.
More than one subscriber can subscribe to a subject. They will share the same instance of the observable. This means that all of them receive the same event when the subject emits it.
Multiple observers of an observable, on the other hand, will receive a separate instance of the observable.

https://www.tektutorialshub.com/angular/subjects-in-angular/

**Structural vs Attribute directive**:

Structural directives are used for shaping or reshaping HTML DOM by adding, removing elements. eg. ngIf directive

Attribute directives are used to change the appearance or behavior of DOM element. eg. ngStyle directive.

**Content Projection**:

Content projection is used to create flexible, reusable components. In the template of the component, use **ng-content**, and then fill these slots when using another compnent.

https://angular.io/guide/content-projection

**ng-container**:

A special element that can hold structural directives without adding new elements to the DOM. Commonly used with ng-if
```
<ng-container *ngIf="condition">
  …
</ng-container>
```

https://angular.io/api/core/ng-container#description

**Interceptors**:

Intercept http requests/responses to modify them before passing to the next interceptor in the chain.

https://angular.io/api/common/http/HttpInterceptor

**Hierarchial dependency injection**:

A hierarchical dependency injection system allows us to define different scopes for our dependencies in the component tree.

https://www.w3resource.com/angular/hierarchical-dependency-injectors.php

**Execution context vs Execution stack**:

There are three types of execution context in JavaScript.

1. Global Execution Context — The code that is not inside any function is in the global execution context. It performs two things: it creates a global object which is a window object (in the case of browsers) and sets the value of this to equal to the global object. There can only be one global execution context in a program.
2. Functional Execution Context — Every time a function is invoked, a brand new execution context is created for that function
3. Eval Function Execution Context — Code executed inside an eval function.

Execution stack: When the JavaScript engine first encounters your script, it creates a global execution context and pushes it to the current execution stack. Whenever the engine finds a function invocation, it creates a new execution context for that function and pushes it to the top of the stack. LIFO stack.

**Q. How does Angular handle dependency injection?**

Ans. **Providers** first defines how a dependency (service) is created. 
Provdder can be registered at 3 levels:
1. Module level in app.module under @NgModule.
2. Component level via @Component annotation
3. Root level vi @Injectable(providedIn: 'root')

Then these are most commonly injected into components via constructor injection.

**Q. Describe the change detection mechanism in Angular.**

Ans. Angular uses zones to detect asyncrhonous tasks to trigger tasks such as events, http calls, or timers are completed. When such events are finished Angular triggers change detection to update the view.

Angular has two change detection strategies:
1. Default: Every time an event occurs, Angular runs change detection for the entire component tree.
2. OnPush: Angular runs change detection only when the component's input properties change. This is useful for optimizing performance.

You can set the change detection strategy using the ChangeDetectionStrategy enum in the component decorator:
```
@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
```

**NgZone**: Asynchronous events like setTimeout() do trigger change detection in angular. However, if you are showing a timer on ui, you dont want change detection to occur every time on entire DOM, as it can slow down UI. So optimize, use NgZone to run the timer outside angular's normal detection zone. This allows for fine grained control over a specific event wihtout triggering default change detection for the event. 

eg:

 ```
import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private ngZone: NgZone) {}
  detectChanges() {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          // Your code that triggers change detection
          console.log('Change detected inside Angular zone');
        });
      }, 2000);
    });
  }
}
 ```
Another option is to use **ChangeDetectorRef** eg:
```
export class AppComponent {
  constructor(private cdRef: ChangeDetectorRef) {}
  detectChanges() {
    setTimeout(() => {
      // Your code that triggers change detection
      console.log('Change detected using ChangeDetectorRef');
      this.cdRef.detectChanges();
    }, 2000);
  }
}
```

**Q. How would you optimize an Angular application for performance?**
Ans. 
1. Use ChangeDetectionStrategy.OnPush to minimize the number of change detection cycles.
2. Use NGZone for finer control of timer tasks change detection.
3. Lazy load modules
4. AOT compilation, reducing work on browser.
5. Webpack bundling and minification.

**Q. What is Angular Universal?**

Ans. It is used for server side rendering (SSR) in Angular. Server side rendering helps in better SEO (Search Engine Optimisation) rating as search egnine crawlers can better index the complete HTML as send from server side.

**Q. State management in Angular?**

Ans. Save the state in service, or use NgRx.

**Q. Explain the difference between template-driven and reactive forms.**

Ans. Template driven uses angular provided directives (like ngModel, ngForm, and ngModelGroup). They are easy to setup and implicitly provide 2 way binding, but provide only baisc set of validations.

Reactive forms on the other hand are more suited for larger projects, which require detailed validations. Form directives are explcitly bound to template using Angular directives. Form logic is defined in the component class using form control objects (FormGroup, FormControl, FormArray)

**Logging using ngx-logger**

https://dzone.com/articles/angular-logging-and-log-back

**CSS Extras**:
CSS positioning. esp. Sticky vs fixed:

https://www.geeksforgeeks.org/what-is-the-difference-between-positionsticky-and-positionfixed-in-css/


**CSS Flexbox**: 

Before the Flexbox Layout module, there were four layout modes:

1. Block, for sections in a webpage
2. Inline, for text
3. Table, for two-dimensional table data
4. Positioned, for explicit position of an element

The Flexible Box Layout Module, makes it easier to design flexible responsive layout structure without using float or positioning.
used to define how to stack the elements: horizontal/vertical/wrap etc.

https://www.w3schools.com/css/css3_flexbox.asp


**NgRx**: Similar to Redux, used for reactive state management. Single state is maintained across the application, and it is updated on various events. NgRx is made up of 5 main components:

1. **Store**: One client side data store.
2. **Actions**: Events.
3. **Reducers**:  Reducers react to the Actions dispatched and executes a pure function to update the Store. Pure functions are functions that are predictable and have no side effects. Given the same set of inputs, a pure function will always return the same set of outputs.
4. **Selectors**: Selectors are how our application can listen to state changes.
5. **Effects**: Effects handle the side effects of each Action. These side effects range from communicating with an external API via HTTP when a certain Action is dispatched to dispatching another Action to update another part of the State.

Read this for more details: https://auth0.com/blog/state-management-in-angular-with-ngrx-1/

**Ng-change**: It's a directive used to call some function, every time an associated ng-model input element changes. The expression is evaluated immediately, unlike the JavaScript onchange event which only triggers at the end of a change (usually, when the user leaves the form element or presses the return key).

```
<input type="text" ng-change="someFunc()" ng-model="myValue" />
```

**Q. Describe a scenario where you used Angular to solve a complex problem.**
**Ans.** Replaced a legacy applciation by creating a new Angular application, with its clinet side rendering, and ag-grid features - gave a better UX to users.

**TODO**: ag-grid example to be added in this poc.


**References**:

Using Bootstrap with angular: https://medium.com/codingthesmartway-com-blog/using-bootstrap-with-angular-c83c3cee3f4a

Reactive Forms: https://alligator.io/angular/reactive-forms-introduction/

https://youtu.be/oa9cnWTpqP8

https://programmingwithmosh.com/angular/angular-4-tutorial/

https://angular.io/guide/cheatsheet

