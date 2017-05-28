/// <reference path="../../app/WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeStorage } from "@ionic-native/native-storage";
import { UserModel } from '../user/user.model';

/*
  Generated class for the ARView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ar-view',
  templateUrl: 'ar-view.html'
})
export class ARView {

  user: UserModel = new UserModel();

  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage) {}

  ionViewDidLoad() {
    console.log('Hello ARView Page');
  }

  ionViewDidEnter() {
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


    var startupConfiguration: any = {"camera_position": "back"};

    WikitudePlugin.loadARchitectWorld(
      function(success) {
        console.log("ARchitect World loaded successfully.");
      },
      function(fail) {
        console.log("Failed to load ARchitect World!");
      },
      "www/assets/ARWorld/index.html",
      ["geo"],
      <JSON>startupConfiguration
    );
  }

}
