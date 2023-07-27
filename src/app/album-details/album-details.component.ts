import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album, List } from '../album';
import { AlbumService } from '../album.service';
import { fadeInAnimation } from '../animation.module';

@Component({
    selector: 'app-album-details',
    templateUrl: './album-details.component.html',
    styleUrls: ['./album-details.component.css'],
    animations: [fadeInAnimation]
})
export class AlbumDetailsComponent implements OnInit {

    // Classe Input permet de récupérer les data de l'enfant
    // album est liée à une entrée [album] du parent dans le sélecteur 
    @Input() album!: Album;
    albumList: string[] | undefined= [];  // tableau qui stocke la liste des chansons
    constructor(
        private albumService : AlbumService
    ) {}

    @Output() onPlay: EventEmitter<Album> = new EventEmitter();

    ngOnInit(): void {
        console.log(this.album); // pour l'instant c'est undefined.... C'est normal
    }

    ngOnChanges(): void {
        // récupérer la liste des chansons
        // ALBUM_LISTS.forEach(listSelected => {
        //     if (listSelected.id === this.album.id) {
        //         this.albumList = listSelected.list
        //     }
        // });
        //  Deuxième méthode
        if (this.album) {
            this.albumList = this.albumService.getAlbumList(this.album.id)?.list;
            console.log(this.albumList)
        }
    }

    play(album: Album) {
        this.onPlay.emit(album); // émettre un album vers le parent
    }

}
