import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {  
  currentMessage = new BehaviorSubject(null);
  constructor(private angularFireMessaging: AngularFireMessaging) { 
    this.angularFireMessaging.messages.subscribe((msgings) => {
      console.log("new message received. ", msgings);
      this.currentMessage.next(msgings);
   })
 }

 requestPermission() {
   this.angularFireMessaging.requestToken.subscribe(
   (token) => {
    console.log(token);
    localStorage.setItem('token',token);
   });
 }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((msg) => {
      console.log("show message!", msg);
      this.currentMessage.next(msg);
    })
  }
}
