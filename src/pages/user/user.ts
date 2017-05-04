/**
 * Created by miordache on 5/4/17.
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoginPage } from '../login/login';
import { UserModel } from '../home/user.model';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})

export class UserPage {
  user: UserModel = new UserModel();

  constructor(public navCtrl: NavController, public nativeStorage: NativeStorage,
  public googlePlus: GooglePlus) {}

  ionViewCanEnter(){
    let env = this;
    this.nativeStorage.getItem('user')
      .then(function (data){
        env.user = {
          name: data.name,
          email: data.email,
          picture: data.picture
        };
      }, function(error){
        console.log(error);
      });
  }

  doGoogleLogout(){
    let nav = this.navCtrl;
    this.googlePlus.logout()
      .then(function (response) {
        this.NativeStorage.remove('user');
        nav.push(LoginPage);
      },function (error) {
        console.log(error);
      })
  }

}
