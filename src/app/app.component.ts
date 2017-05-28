/// <reference path="WikitudePlugin.d.ts" />
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from '@ionic-native/google-plus';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoadApi } from '../shared/shared';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, googlePlus: GooglePlus, private nativeStorage:NativeStorage,private loadApi: LoadApi, private http: Http) {
    platform.ready().then(() => {
      let env = this;

      googlePlus.trySilentLogin({
        'scopes': "", // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        'webClientId': '777423291621-quk5q5dim2p63flk1ok1kfrtm735r929.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        'offline': true
      })
        .then((data) => {

          // this.http.get('https://192.168.0.101:3003/api/list')
          //   .subscribe(res => {
          //     console.log(res)
          //     },
          //     error => {
          //     console.log(error);
          //   });
      //
      // this.loadApi.getFilePaths(data)
      //       .then(data => {
      //         env.nav.push(TabsPage);
      //       });
          splashScreen.hide();
        }, function (error){
          env.nav.push(LoginPage);
          splashScreen.hide();
        });
      env.nav.push(TabsPage);
      statusBar.styleDefault();

      WikitudePlugin._sdkKey = "D8VNhr5M3RFtoU4wpuWi+gkYeWlaMBU32Vx4snuObDESxVE08YOSop2z7i59IUNkLPvfPriD2hyGizN4bOu0Wl+JmkKmZyeoT6PSuKm5yp+aFM9qX9JeRzuxV+XLhktt+/DcLYw4Mf41G17DxU0N8hPviKUj6WEst7aEq/Z1Hd5TYWx0ZWRfX1bnIUwDPVatZMSHepahsqEFIoM8Ns8EOf6E61XtUeP9WgnT5/DQ0WAqxxA+GiZvDlLS0oMYNynM1hTW5YjxpyPwJB9QHgiblXfU0X91Og1/MO9SsZ3mkt/46m6m+hy3Czc3lei1kqo+QjBFShS/G5TIfbcWLifTwfE+7A/aw/MiigmSfAxpZR+5QtO16fj3qfhE8LMyumN16QDQYCvlHyAqVayU2TAGpUBKvr+6LQOBfZAJ3H9tMAcu+184olqLcRbwZM9hPgbJRlR4EWhZfh8IRJrA50v2iqBG94NL1N9qDcUe1RhUh5kpI52qM/h+ky2aNcdjpK7U4ihshL1lcxTG865beqcmJ0ejf1RrGpaNRV/joXonMy8vqcTBQAvLFjJFINNiNPitNBHjHF+GZ+XmbkCzazw6ESj7VTqJZViN8xpvm6xDILJaOD68o25C2XMW3jPNyEedFrUvYcQ4ElXKSJrPt9hlP0Fi+Z2ocY9SV++rM8jMibTBl9gciP2yjFzsxVjlSN+tNsMxW8mYeKdZfxCH3/zwCGXDp4Vboq00VV3p/aAcGTVDShCCovDmbd1ES7tKJRQk";

      WikitudePlugin.isDeviceSupported(
          function(success) {
            console.log("Your platform supports AR/Wikitude. Have fun developing!!");
          },
          function(fail) {
            console.log("Your platform failed to run AR/Wikitude: "+fail);
          },
          [WikitudePlugin.FeatureGeo]
      );

      WikitudePlugin.setOnUrlInvokeCallback(function(url) {

        if (url.indexOf('captureScreen') > -1) {
            WikitudePlugin.captureScreen(
                (absoluteFilePath) => {
                    console.log("snapshot stored at:\n" + absoluteFilePath);

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

      WikitudePlugin.onWikitudeOK = function() {
          console.log("Things went ok.");
      }


      WikitudePlugin.onWikitudeError = function() {
          console.log("Something went wrong");
      }
    });
  }
}
