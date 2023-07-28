import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs'; // Reactive eXtension JavaScript (RXJS)
import { fadeInAnimation } from '../animation.module';

@Component({
  selector: 'app-open-close',
  templateUrl: './open-close.component.html',
  styleUrls: ['./open-close.component.css'],
  animations: [ fadeInAnimation ]
  })
export class OpenCloseComponent implements OnInit {
  ngOnInit(): void {
    // On s'abonne à l'observable
    this.myObservable.subscribe((album) => {
      console.log(album);
      
    });
  }
  // Observable: produit | objet | message qui sera diffusé
  // Observer: l'élément qui souscrit pour un produit | objet | message donné

  //  new Observable((observer) => {})
  // new Subject

   myObservable = new Observable((observer: Observer<string>) => {
    // le code à éxécuter quand on récupère la donnée
    // observer.next("album 1");
    // observer.next("album 2");
    // observer.next("album 3");
    // observer.next("album 4");
    // observer.next("album 5");

    setTimeout(() => {observer.next("album 1");}, 1000);
    setTimeout(() => {observer.next("album 2");}, 2000);
    setTimeout(() => {observer.next("album 3");}, 3000);
    setTimeout(() => {observer.next("album 4");}, 4000);
    setTimeout(() => {observer.next("album 5");}, 5000);
    
   });

  isOpen = true;

  toggle(){
    this.isOpen = !this.isOpen;
  }

}
