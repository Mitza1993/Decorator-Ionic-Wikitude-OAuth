/// <reference path="../../app/WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeStorage } from "@ionic-native/native-storage";
import { UserModel } from '../user/user.model';
import * as _ from 'lodash';

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
        let paths = _.map(window['entries'], 'fullPath');
        let stringifiedPaths = paths.join('|');
        // WikitudePlugin.callJavaScript('World.updatePaths("asd")');
        // WikitudePlugin.callJavaScript('World.updatePaths(\""+stringifiedPaths+"\")');
      },
      function(fail) {
        console.log("Failed to load ARchitect World!");
      },
      "www/assets/ARWorld/index.html",
      ["geo"],
      <JSON>startupConfiguration
    );

    WikitudePlugin.setOnUrlInvokeCallback(function(url) {

      // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic2)
      if (url.indexOf('captureScreen') > -1) {
        WikitudePlugin.captureScreen(
          (absoluteFilePath) => {
            console.log("snapshot stored at:\n" + "");

            // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
            WikitudePlugin.callJavaScript("World.testFunction('mihaiiordache');");
          },
          (errorMessage) => {
            console.log(errorMessage);
          },
          true, null
        );
      } else {
        alert(url + "not handled");
      }
    });

    /**
     * Define the generic ok callback
     */
    WikitudePlugin.onWikitudeOK = function() {
      console.log("Things went ok.");
    }

    /**
     * Define the generic failure callback
     */
    WikitudePlugin.onWikitudeError = function() {
      console.log("Something went wrong");
    }
  }

}
