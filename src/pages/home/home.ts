import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http,Headers, RequestOptions} from '@angular/http';
import { Transfer , TransferObject } from '@ionic-native/transfer';
import { NativeStorage } from '@ionic-native/native-storage';
import { UserModel } from '../user/user.model';
import { _ } from 'lodash';

declare var cordova:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: UserModel = new UserModel();
  models: string[];


  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage,private http: Http, private transfer: Transfer) {}

  public fileTransfer :  TransferObject = this.transfer.create();


  ionViewDidEnter(){ //ionViewDidLoad
    let env = this;
    this.nativeStorage.getItem('user')
      .then((data) => {
        this.user = data;
        this.retrieveFiles(JSON.parse(data));
      }, function(error){
        console.log(error);
      });
  }


  retrieveFiles(data) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append("Content-Type", ' application/json');

    let options = new RequestOptions({headers: headers});
    let postParams = data;

    this.http.post('https://10.162.240.253:3003/api/store', postParams, options)
      .subscribe(data => {
        this.downloadModels(data);
      }, error => {
        console.log(error);
      });
  }

  downloadModels(data) {
    console.log(data);

    _.forEach(data, function(item, index) {
      let url = "https://10.162.240.253:3003/" + this.user.name.replace(/ /g,"").toLowerCase() + "/" + item;
      this.fileTransfer.download(url, cordova.file.externalRootDirectory + "Decorator/" + data.name)
        .then((entry) => {
          console.log(entry);
        }, (error) => {
          console.log(error);
        });
    });

  }
}
