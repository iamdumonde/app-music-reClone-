import { Injectable } from '@angular/core';

// Une classe injectable est un service et peut être recevoir d'autre(s) service(s) 
@Injectable({
  providedIn: 'root' // injecter de manière globale
})
export class AlbumService {
  constructor() { }

  getAlbums() {
    return this.albums
  }

  getAlbum(id: string) {
    return this.album
  }

  getAlbumList (id: string) {
    return this.albumList
  }
}
