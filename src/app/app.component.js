"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="WikitudePlugin.d.ts" />
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var login_1 = require("../pages/login/login");
var tabs_1 = require("../pages/tabs/tabs");
require("rxjs/add/operator/map");
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, googlePlus, nativeStorage, http) {
        var _this = this;
        this.nativeStorage = nativeStorage;
        platform.ready().then(function () {
            var env = _this;
            googlePlus.trySilentLogin({
                'scopes': "",
                'webClientId': '777423291621-quk5q5dim2p63flk1ok1kfrtm735r929.apps.googleusercontent.com',
                'offline': true
            })
                .then(function (data) {
                // let headers = new Headers();
                env.nav.push(tabs_1.TabsPage);
                //be POST request for getting filePaths from server
                http.post('http://192.168.0.100:3003/auth', JSON.stringify(data))
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    console.log(data); // filesPaths
                });
                splashScreen.hide();
            }, function (error) {
                env.nav.push(login_1.LoginPage);
                splashScreen.hide();
            });
            statusBar.styleDefault();
            //   WikitudePlugin._sdkKey = "D8VNhr5M3RFtoU4wpuWi+gkYeWlaMBU32Vx4snuObDESxVE08YOSop2z7i59IUNkLPvfPriD2hyGizN4bOu0Wl+JmkKmZyeoT6PSuKm5yp+aFM9qX9JeRzuxV+XLhktt+/DcLYw4Mf41G17DxU0N8hPviKUj6WEst7aEq/Z1Hd5TYWx0ZWRfX1bnIUwDPVatZMSHepahsqEFIoM8Ns8EOf6E61XtUeP9WgnT5/DQ0WAqxxA+GiZvDlLS0oMYNynM1hTW5YjxpyPwJB9QHgiblXfU0X91Og1/MO9SsZ3mkt/46m6m+hy3Czc3lei1kqo+QjBFShS/G5TIfbcWLifTwfE+7A/aw/MiigmSfAxpZR+5QtO16fj3qfhE8LMyumN16QDQYCvlHyAqVayU2TAGpUBKvr+6LQOBfZAJ3H9tMAcu+184olqLcRbwZM9hPgbJRlR4EWhZfh8IRJrA50v2iqBG94NL1N9qDcUe1RhUh5kpI52qM/h+ky2aNcdjpK7U4ihshL1lcxTG865beqcmJ0ejf1RrGpaNRV/joXonMy8vqcTBQAvLFjJFINNiNPitNBHjHF+GZ+XmbkCzazw6ESj7VTqJZViN8xpvm6xDILJaOD68o25C2XMW3jPNyEedFrUvYcQ4ElXKSJrPt9hlP0Fi+Z2ocY9SV++rM8jMibTBl9gciP2yjFzsxVjlSN+tNsMxW8mYeKdZfxCH3/zwCGXDp4Vboq00VV3p/aAcGTVDShCCovDmbd1ES7tKJRQk";
            //
            //   WikitudePlugin.isDeviceSupported(
            //       function(success) {
            //         console.log("Your platform supports AR/Wikitude. Have fun developing!!");
            //       },
            //       function(fail) {
            //         console.log("Your platform failed to run AR/Wikitude: "+fail);
            //       },
            //       [WikitudePlugin.FeatureGeo]
            //   );
            //
            //   WikitudePlugin.setOnUrlInvokeCallback(function(url) {
            //
            //     if (url.indexOf('captureScreen') > -1) {
            //         WikitudePlugin.captureScreen(
            //             (absoluteFilePath) => {
            //                 console.log("snapshot stored at:\n" + absoluteFilePath);
            //
            //                 WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath +"');");
            //             },
            //             (errorMessage) => {
            //                 console.log(errorMessage);
            //             },
            //             true, null
            //         );
            //     } else {
            //         alert(url + "not handled");
            //     }
            //   });
            //
            //   WikitudePlugin.onWikitudeOK = function() {
            //       console.log("Things went ok.");
            //   }
            //
            //
            //   WikitudePlugin.onWikitudeError = function() {
            //       console.log("Something went wrong");
            //   }
        });
    }
    return MyApp;
}());
__decorate([
    core_1.ViewChild(ionic_angular_1.Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    core_1.Component({
        templateUrl: 'app.html'
    })
], MyApp);
exports.MyApp = MyApp;
