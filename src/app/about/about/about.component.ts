import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  //to consume params from routes
import { Router } from '@angular/router';  //to navigate between routes

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent  {

  constructor(private route: ActivatedRoute, private router: Router) { 
    this.route.params.subscribe(res => console.log(res.id));
  }

  sendMeHome(){
    this.router.navigate(['']); // the emtpy url corresponds to the default route
  }

}
