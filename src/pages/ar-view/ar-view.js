"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../app/WikitudePlugin.d.ts" />
var core_1 = require("@angular/core");
var user_model_1 = require("../home/user.model");
/*
  Generated class for the ARView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ARView = (function () {
    function ARView(navCtrl, nativeStorage) {
        this.navCtrl = navCtrl;
        this.nativeStorage = nativeStorage;
        this.user = new user_model_1.UserModel();
    }
    ARView.prototype.ionViewDidLoad = function () {
        console.log('Hello ARView Page');
    };
    ARView.prototype.ionViewDidEnter = function () {
        var env = this;
        this.nativeStorage.getItem('user')
            .then(function (data) {
            env.user = {
                name: data.name,
                email: data.email,
                picture: data.picture,
                accessToken: data.accessToken,
                idToken: data.idToken,
                refreshToken: data.refreshToken,
                serverAuthCode: data.serverAuthCode,
                userId: data.userId
            };
        }, function (error) {
            console.log(error);
        });
        var startupConfiguration = { "camera_position": "back" };
        WikitudePlugin.loadARchitectWorld(function (success) {
            console.log("ARchitect World loaded successfully.");
        }, function (fail) {
            console.log("Failed to load ARchitect World!");
        }, "www/assets/ARWorld/index.html", ["geo"], startupConfiguration);
    };
    return ARView;
}());
ARView = __decorate([
    core_1.Component({
        selector: 'page-ar-view',
        templateUrl: 'ar-view.html'
    })
], ARView);
exports.ARView = ARView;
