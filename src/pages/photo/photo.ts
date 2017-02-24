import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Camera, Geolocation, Coordinates } from 'ionic-native';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoStorage, PhotoRecord } from '../../services/storage';

const PLACEHOLDER: string = 'assets/images/placeholder.png'

@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html'
})
export class PhotoPage {
  private base64Image: string = PLACEHOLDER;
  private PLACEHOLDER: string = PLACEHOLDER;
  private photoList: PhotoRecord[] = [];
  private coords: Coordinates = null;
  private locationLoading: boolean = false;

  constructor(
    private photoStorage: PhotoStorage,
    private navCtrl: NavController,
    private DomSanitizer: DomSanitizer
  ) {
    this.photoStorage.getPhotos().then(photos => {
      this.photoList = photos;
    })
  }

  savePicture() {
    if (this.base64Image !== this.PLACEHOLDER) {
      this.photoStorage.addPhoto(this.base64Image, this.coords).then(() => {
        this.photoStorage.getPhotos().then(photoList => this.photoList = photoList);
      });
      this.coords = null;
      this.base64Image = this.PLACEHOLDER;
    }
  }

  deletePicture(index) {
    this.photoStorage.deletePhoto(index).then(() => {
      this.photoStorage.getPhotos().then(photoList => this.photoList = photoList);
    });
  }

  takePicture() {
    if (this.base64Image === this.PLACEHOLDER) {
      Camera.getPicture({
        correctOrientation: true,
        destinationType: Camera.DestinationType.DATA_URL,
      }).then((imageData) => {
        this.locationLoading = true;
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
        Geolocation.getCurrentPosition().then((resp) => {
          this.coords = resp.coords;
          this.locationLoading = false;
          console.log(this.coords);
        }).catch((error) => {
          this.coords = null;
          this.locationLoading = false;
          console.error('Error getting location', error);
        });
      }, (err) => {
        this.coords = null;
        console.error(err);
      });
    } else {
      this.coords = null;
      this.base64Image = this.PLACEHOLDER;
    }
  }

}
