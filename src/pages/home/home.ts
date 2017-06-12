import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http,Headers, RequestOptions} from '@angular/http';
import { Transfer , TransferObject } from '@ionic-native/transfer';
import { NativeStorage } from '@ionic-native/native-storage';
import { UserModel } from '../user/user.model';
import * as _ from 'lodash';

declare var cordova:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user: UserModel = new UserModel();
  public models: string[];


  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage,private http: Http, private transfer: Transfer) {}

  public fileTransfer :  TransferObject = this.transfer.create();


  ionViewDidEnter(){ //ionViewDidLoad
    let env = this;
    this.nativeStorage.getItem('user')
      .then((data) => {
        this.user = data;
        // this.retrieveFiles(data);
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

    this.http.post('https://192.168.0.101:3003/api/store', postParams, options)
      .map(res => res.json())
      .subscribe(data => {
        this.downloadModels(data.items).then((entries) => {
          window['entries'] = entries;
          // WikitudePlugin.callJavaScript(`World.updatePaths(${entries})`)
        })
      }, error => {
        console.log(error);
      });
  }

  downloadModels(data): Promise <any> {
    let modelPromises = [];

    data.forEach( (value, key, index) => {
      let path = 'assets/models/' + value;
      let url = "https://192.168.0.101:3003/files/" + value;
      modelPromises.push(
        this.fileTransfer.download(url, cordova.file.dataDirectory + value)
      )
    });

    return Promise.all(modelPromises).then((entries) => entries);
  }
}
