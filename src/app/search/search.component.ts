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
        const results: Album[] = this.albumService.search(form.value.word); // récupération d'une valeur spécifique
       this.searchAlbums.emit(results);
        // console.log(form.value.word);
        
    }

    onChangesEmit($event: string) {
        const results: Album[] = this.albumService.search(  $event); // récupération d'une valeur spécifique
        this.searchAlbums.emit(results);
    }
}
