"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_model_1 = require("./user.model");
var login_1 = require("../login/login");
var HomePage = (function () {
    function HomePage(navCtrl, nativeStorage, googlePlus) {
        this.navCtrl = navCtrl;
        this.nativeStorage = nativeStorage;
        this.googlePlus = googlePlus;
        this.user = new user_model_1.UserModel();
    }
    HomePage.prototype.ionViewCanEnter = function () {
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
    };
    HomePage.prototype.doGoogleLogout = function () {
        var _this = this;
        var nav = this.navCtrl;
        this.googlePlus.logout()
            .then(function (response) {
            _this.nativeStorage.remove('user');
            // nav.push(LoginPage);
            nav.setRoot(login_1.LoginPage);
        }, function (error) {
            console.log(error);
        });
    };
    HomePage.prototype.start = function () {
        console.log(gapi);
        gapi.load('auth2', function () {
            gapi.auth2.init({
                client_id: "777423291621-fueigtc74dltu6q8dljo4ddneieq7jj8.apps.googleusercontent.com",
                scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
            }).then(function () {
                console.log("initiated");
            }, function (reason) {
                console.log(reason);
            });
        });
    };
    HomePage.prototype.initClient = function () {
        gapi.client.init({
            apiKey: 'AIzaSyD7ilXLTTNbzzXWkJDELei8M2_jsZhKywY',
            clientId: "777423291621-fueigtc74dltu6q8dljo4ddneieq7jj8.apps.googleusercontent.com",
            scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]
        });
    };
    HomePage.prototype.listFiles = function () {
        var request = gapi.client['drive'].files.list({
            'pageSize': 10,
            'fields': "nextPageToken, files(id,name)"
        });
        request.execute(function (resp) {
            console.log('Files:');
            var files = resp.files;
            if (files && files.length > 0) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    console.log(file.name + ' (' + file.id + ')');
                }
            }
            else {
                console.log('No files found.');
            }
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    core_1.Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    })
], HomePage);
exports.HomePage = HomePage;
