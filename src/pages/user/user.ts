import { Component } from '@angular/core';
import { UserModel } from '../user/user.model';
import { NativeStorage } from '@ionic-native/native-storage';
import { GooglePlus } from '@ionic-native/google-plus';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';


@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  user: UserModel = new UserModel();


  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage, private googlePlus: GooglePlus, public appCtrl: App) {}

  ionViewCanEnter() {
    let env = this;
    this.nativeStorage.getItem('user')
      .then((data) => {
        env.user = {
          name: data.name,
          email: data.email,
          picture: data.picture,
          accessToken : data.accessToken,
          idToken: data.idToken,
          refreshToken: data.refreshToken,
          serverAuthCode: data.serverAuthCode,
          userId: data.userId
        };
      }, function(error){
        console.log(error);
      });
  }


  doGoogleLogout(){
    let nav = this.navCtrl;
    this.googlePlus.logout()
      .then((response) => {
        this.nativeStorage.remove('user');
        // nav.push(LoginPage);
        // nav.setRoot(LoginPage);
        this.appCtrl.getRootNav().setRoot(LoginPage);
      },function (error) {
        console.log(error);
      })
  }

}
