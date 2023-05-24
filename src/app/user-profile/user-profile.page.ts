import { Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  constructor(private router:Router){


  }

  ngOnInit() {
  }
  goToMainPage():void{
    //this.router.navigate(['/mainPage']);

  }
  goToSettings(): void{
    //this.router.navigate(['/settingsPage']);
  }

}
