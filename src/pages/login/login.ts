/**
 * Created by miordache on 5/4/17.
 */
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
  public googlePlus: GooglePlus, private nativeStorage: NativeStorage) {}

  doGoogleLogin(){
    let nav = this.navCtrl;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.googlePlus.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '777423291621-quk5q5dim2p63flk1ok1kfrtm735r929.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    })
      .then((user) => {
        loading.dismiss();

        //store more items from user response
        this.nativeStorage.setItem('user', {
          name: user.displayName,
          email: user.email,
          picture: user.imageUrl,
          accessToken : user.accessToken,
          idToken: user.idToken,
          refreshToken: user.refreshToken,
          serverAuthCode: user.serverAuthCode,
          userId: user.userId
        })
          .then(function(){
            nav.push(TabsPage);
          }, function (error) {
            console.log(error);
          })
      }, function (error) {
        loading.dismiss();
      });
  }
}
