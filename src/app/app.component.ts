/// <reference path="WikitudePlugin.d.ts" />
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from '@ionic-native/google-plus';
import { LoginPage } from '../pages/login/login';
import { UserPage } from '../pages/user/user';

// import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, googlePlus: GooglePlus) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log(GooglePlus);
      let env = this;
      // user is previously logged and we have his data
      // we will let him access the app

      googlePlus.trySilentLogin({
        'scopes': 'https://www.googleapis.com/auth/drive', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        'webClientId': 'webClientId.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        'offline': true
      })
        .then(function(data) {
          env.nav.push(UserPage);
          splashScreen.hide();
        }, function (error){
          env.nav.push(LoginPage);
          splashScreen.hide();
        });


      statusBar.styleDefault();

      /** Enter your Wikitude (trial) License Key here */
      WikitudePlugin._sdkKey = "D8VNhr5M3RFtoU4wpuWi+gkYeWlaMBU32Vx4snuObDESxVE08YOSop2z7i59IUNkLPvfPriD2hyGizN4bOu0Wl+JmkKmZyeoT6PSuKm5yp+aFM9qX9JeRzuxV+XLhktt+/DcLYw4Mf41G17DxU0N8hPviKUj6WEst7aEq/Z1Hd5TYWx0ZWRfX1bnIUwDPVatZMSHepahsqEFIoM8Ns8EOf6E61XtUeP9WgnT5/DQ0WAqxxA+GiZvDlLS0oMYNynM1hTW5YjxpyPwJB9QHgiblXfU0X91Og1/MO9SsZ3mkt/46m6m+hy3Czc3lei1kqo+QjBFShS/G5TIfbcWLifTwfE+7A/aw/MiigmSfAxpZR+5QtO16fj3qfhE8LMyumN16QDQYCvlHyAqVayU2TAGpUBKvr+6LQOBfZAJ3H9tMAcu+184olqLcRbwZM9hPgbJRlR4EWhZfh8IRJrA50v2iqBG94NL1N9qDcUe1RhUh5kpI52qM/h+ky2aNcdjpK7U4ihshL1lcxTG865beqcmJ0ejf1RrGpaNRV/joXonMy8vqcTBQAvLFjJFINNiNPitNBHjHF+GZ+XmbkCzazw6ESj7VTqJZViN8xpvm6xDILJaOD68o25C2XMW3jPNyEedFrUvYcQ4ElXKSJrPt9hlP0Fi+Z2ocY9SV++rM8jMibTBl9gciP2yjFzsxVjlSN+tNsMxW8mYeKdZfxCH3/zwCGXDp4Vboq00VV3p/aAcGTVDShCCovDmbd1ES7tKJRQk";


      /** Check if your device supports AR */
      WikitudePlugin.isDeviceSupported(
          function(success) {
            console.log("Your platform supports AR/Wikitude. Have fun developing!!");
          },
          function(fail) {
            console.log("Your platform failed to run AR/Wikitude: "+fail);
          },
          [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking
      );

      /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works
       * through the function below for the direction Ionic2 app --> Wikitude SDK
       * For calls from Wikitude SDK --> Ionic2 app see the captureScreen example in
       * WikitudeIonic2StarterApp/www/assets/3_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
      // set the function to be called, when a "communication" is indicated from the AR View
      WikitudePlugin.setOnUrlInvokeCallback(function(url) {

        // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic2)
        if (url.indexOf('captureScreen') > -1) {
            WikitudePlugin.captureScreen(
                (absoluteFilePath) => {
                    console.log("snapshot stored at:\n" + absoluteFilePath);

                    // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
                    WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath +"');");
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

      // Just as an example: set the location within the Wikitude SDK, if you need this (You can get the geo coordinates by using ionic native
      // GeoLocation plugin: http://ionicframework.com/docs/v2/native/geolocation/
      //WikitudePlugin.setLocation(47, 13, 450, 1);

      /* for Android only
      WikitudePlugin.setBackButtonCallback(
          () => {
              console.log("Back button has been pressed...");
          }
      );
      */

    });
  }
}
