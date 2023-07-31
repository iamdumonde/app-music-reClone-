import { Component, OnInit } from '@angular/core';

// Importez la définition de la classe et les albums
import { Album } from '../album';
import { AlbumService } from '../album.service';
import { detailsAnimation, fadeInAnimation } from '../animation.module';

@Component({
    selector: 'app-albums',
    templateUrl: './albums.component.html',
    styleUrls: ['./albums.component.css'],
    animations: [fadeInAnimation, detailsAnimation]
})
export class AlbumsComponent implements OnInit {
    titlePage: string = "Page principale Albums Music";
    albums: Album[] | undefined = undefined;
    status: string | null = null;


    selectedAlbum!: Album;  // je suis sur qu'une valeur sera passé au moment opportun
    constructor(
        private albumServivce: AlbumService
    ) {
        console.log(`${this.albumServivce.count()} albums trouvés`);

    }

    ngOnInit(): void {
        this.albums = this.albumServivce.paginate(0, this.albumServivce.paginateNumberPage())
            // .order(function (a: Album, b: Album) {
            //     return a.duration - b.duration
            // }) // ordonne les albums
            // .limit(0, this.albumServivce.paginateNumberPage()) // renvoyer une sous-partie
            // .getAlbums() // récupère les albums
    }

    onSelect(album: Album): void {
        this.selectedAlbum = album;
    }

    playParent($event: Album) {
        // for (let i = 0; i < this.albums.length; i++) {
        //     if (this.albums[i].id === event.id) {
        //         this.albums[i].status = "on"
        //     }else {
        //         this.albums[i].status = "off"
        //     }
        // }
        this.status = $event.id;
    }

    search($event: Album[]) {
        console.log(`Parent sera mis à jour et affichera seulement les albums ${$event}`);
        if ($event) {
            this.albums = $event
        }
    }

    onSetPaginate($event: {start: number, end: number}) {
        // Récuperer les albums compris entre [start, end]
        this.albums = this.albumServivce.paginate($event.start,  $event.end);
    }

}
