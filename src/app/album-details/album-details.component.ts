import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album, List } from '../album';
import { ALBUM_LISTS } from "../mock-albums";

@Component({
    selector: 'app-album-details',
    templateUrl: './album-details.component.html',
    styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {

    // Classe Input permet de récupérer les data de l'enfant
    // album est liée à une entrée [album] du parent dans le sélecteur 
    @Input() album!: Album;
    albumList: string[] = [];
    listSelected!: List;

    @Output() onPlay: EventEmitter<Album> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        console.log(this.album); // pour l'instant c'est undefined.... C'est normal
    }

    ngOnChanges() {
        ALBUM_LISTS.forEach(listSelected => {
            if (listSelected.id === this.album.id) {
                this.albumList = listSelected.list
            }
        });
    }

    play(album: Album) {
        this.onPlay.emit(album); // émettre un album vers le parent
    }

}
