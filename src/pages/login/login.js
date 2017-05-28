"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by miordache on 5/4/17.
 */
var core_1 = require("@angular/core");
var tabs_1 = require("../tabs/tabs");
var LoginPage = (function () {
    function LoginPage(navCtrl, loadingCtrl, googlePlus, nativeStorage) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.googlePlus = googlePlus;
        this.nativeStorage = nativeStorage;
    }
    LoginPage.prototype.doGoogleLogin = function () {
        var _this = this;
        var nav = this.navCtrl;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.googlePlus.login({
            'scopes': '',
            'webClientId': '777423291621-quk5q5dim2p63flk1ok1kfrtm735r929.apps.googleusercontent.com',
            'offline': true
        })
            .then(function (user) {
            loading.dismiss();
            //store more items from user response
            _this.nativeStorage.setItem('user', {
                name: user.displayName,
                email: user.email,
                picture: user.imageUrl,
                accessToken: user.accessToken,
                idToken: user.idToken,
                refreshToken: user.refreshToken,
                serverAuthCode: user.serverAuthCode,
                userId: user.userId
            })
                .then(function () {
                nav.push(tabs_1.TabsPage);
            }, function (error) {
                console.log(error);
            });
        }, function (error) {
            loading.dismiss();
        });
    };
    return LoginPage;
}());
LoginPage = __decorate([
    core_1.Component({
        selector: 'page-login',
        templateUrl: 'login.html',
    })
], LoginPage);
exports.LoginPage = LoginPage;
