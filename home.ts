import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';

import { Camera, PictureSourceType } from '@ionic-native/camera';
import * as Tesseract from 'tesseract.js';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  selectFoto: string;
  imageText: string;

  constructor(  public navCtrl: NavController, private camera: Camera, private actionSheetCtrl: ActionSheetController) {
  }
 
   public selectfonte(){
    
    let ActionSheetController = this.actionSheetCtrl.create({

        buttons: [
         
            {
              
              text : "Sua Blibioteca",
                handler: () => {

               this.tirarFoto(this.camera.PictureSourceType.PHOTOLIBRARY);
                }

                },
                
                {

                   text : 'Capturar imagem',

                   handler: () => {
                        this.tirarFoto(this.camera.PictureSourceType.CAMERA);


                   }

                },
              
              {
       
                   text: 'Cancelar',
                   role: 'calcel'



            }
          ]
          
    });

   
  ActionSheetController.present();
  this.selectFoto = `assets/imgs/teste.png`;

  }

public tirarFoto(sourceType: PictureSourceType){

  this.camera.getPicture({


    quality:100,
    destinationType : this.camera.DestinationType.DATA_URL,
    sourceType :sourceType,
    allowEdit: true,
    saveToPhotoAlbum: false,
    correctOrientation: true
  }).then(ImageData => {

    this.selectFoto = `data:image/jpeg;base64,${ImageData}`;
    
  })



}


public reconhecerfoto(){


  Tesseract.recognize(this.selectFoto)
.then(function(result){
    console.log(result)
})

}



}



