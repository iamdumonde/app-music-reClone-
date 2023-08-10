import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Album } from '../album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
    word: string = " ";
    @Output() searchAlbums: EventEmitter<Album[ ]> = new EventEmitter();
    constructor(
        private albumService: AlbumService
    ) {

    }

    onSubmit(form: NgForm) {
        const results = this.albumService.search(form.value.word).subscribe({
            next: (alb: Album[]) => {
                if (alb.length > 0) {
                    this.searchAlbums.emit(alb)}
                }
        })  // récupération d'une valeur spécifique
        // console.log(form.value.word);
        
    }

    onChangesEmit($event: string) {
        const results = this.albumService.search(  $event).subscribe((alb: Album[]) => {
            this.searchAlbums.emit(alb);
        }); // récupération d'une valeur spécifique
    }
}
