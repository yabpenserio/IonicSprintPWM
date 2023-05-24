import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-master',
  templateUrl: './master.page.html',
  styleUrls: ['./master.page.scss'],
})
export class MasterPage implements OnInit {

  constructor(private router:Router){


  }
  goToProfilePage():void{
    // this.router.navigate(['/profilePage']);

  }


  ngOnInit() {
  }

}
