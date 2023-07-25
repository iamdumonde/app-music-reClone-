import { Component, OnInit } from '@angular/core';

// Importez la définition de la classe et les albums
import { Album } from '../album';
import { ALBUMS } from '../mock-albums';

@Component({
    selector: 'app-albums',
    templateUrl: './albums.component.html',
    styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
    titlePage: string = "Page principale Albums Music";
    albums: Album[] = ALBUMS;
    selectedAlbum!: Album;
    constructor() { }
    ngOnInit() {

    }
    onSelect(album: Album): void{
        this.selectedAlbum = album;
    }

    playParent(event: Album) {
        for (let i = 0; i < this.albums.length; i++) {
            if (this.albums[i].id === event.id) {
                this.albums[i].status = "on"
            }else {
                this.albums[i].status = "off"
            }
        }

    }
}
