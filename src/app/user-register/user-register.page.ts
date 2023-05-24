import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication-service.service';
import { Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from '../auth/user';
import { v4 } from "uuid";
import { fileURLToPath } from 'url';
import { Storage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.page.html',
  styleUrls: ['./user-register.page.scss'],
})

export class UserRegisterPage implements OnInit {
  ionicForm: FormGroup; 
  imageFile:File;
  imageURL= "./assets/icon/favicon.png";
  user: User = {
    uid: "",
    Email: "",
    Name: "",
    Surname: "",
    Telephone: 0,
    PhotoURL: null,
    emailVerified: true

  };
  constructor(
    public authService: AuthenticationService,
    public afStorage: AngularFireStorage,
    public router: Router,
    private fb: FormBuilder
  ) {
    this.ionicForm = this.fb.group({
      Email: new FormControl(''),
      Name: new FormControl(''),
      Surname: new FormControl(''),
      PhotoURL: new FormControl(null),
      Telephone:new FormControl(0)
    })
  }
  upload(file: File, Path: string) {
    this.afStorage.upload('/images', File);  
  }
  setValue(){
    this.user.Name = this.ionicForm.get("Name").value
    this.user.Surname = this.ionicForm.get("Surname").value
    this.user.Email = this.ionicForm.get("Email").value
    this.user.Telephone = this.ionicForm.get("Telephone").value

  }
  func(event){
    const file = (event.target as HTMLInputElement).files[0];
    this.ionicForm.patchValue({
      PhotoURL: file
    });
    this.ionicForm.get('PhotoURL').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
    console.log(file)
    this.imageFile=file
  }
  
  ngOnInit() {
    this.user.uid = v4()
    
  }
  ngOnDestroy(){
    /**CARE WITH THIS CODE */
    this.user ={
    uid: "",
    Email: "",
    Name: "",
    Surname: "",
    Telephone: 0,
    PhotoURL: null,
    emailVerified: true
  }
  }
  signUp(email, password){
    this.setValue()
    this.authService.RegisterUser(email.value, password.value)      
    .then((res) => {
      this.authService.SetUserData(this.user)
      this.upload(this.imageFile,"/images"+this.imageURL)
      this.router.navigate(['/master'])
      
    }).catch((error) => {
      window.alert(error.message)
    })
}

}
