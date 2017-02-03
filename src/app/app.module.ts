import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PhotoPage } from '../pages/photo/photo';
import { PhotoStorage } from '../services/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PhotoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PhotoPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PhotoStorage
  ]
})
export class AppModule {}
