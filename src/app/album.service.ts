import { Injectable } from '@angular/core';
import { Album, List } from './album';
import { ALBUMS, ALBUM_LISTS } from './mock-albums';

// Une classe injectable est un service et peut être recevoir d'autre(s) service(s) 
@Injectable({
    providedIn: 'root' // injecter de manière globale
})
export class AlbumService {

    private _albums: Album[] = ALBUMS // convention private & protected
    private _albumList: List[] = ALBUM_LISTS
    constructor() { }

    /**
     * Fonctions de recherche de tout les albums
     * @returns Retourne la liste de tous les albums
     */
    getAlbums() {
        return this._albums.sort((a: Album, b: Album) => b.duration - a.duration);
    }


    /**
     * 
     * @param id identifiant de l'album à rechercher
     * @returns Retourne l'album correspondant; undefined si l'identifiant ne correspond
     */
    getAlbum(id: string): Album | undefined {
        return this._albums.find(album => album.id === id);
    }

    /**
     * 
     * @param id id à rechercher
     * @returns La référence sera retourné si elle existe; undefined si l'id n'existe pas dans la liste.
     */
    getAlbumList(id: string): List | undefined {
        return this._albumList.find(list => list.id === id)
    }

    /**
     * Fonction qui retourne le nombre d'albums
     * @returns Le nombre d'albums
     */
    count() {
        return this._albums.length;
    }

    paginate(start: number, end: number): Album[] {
        return this._albums
            .slice(start, end)
            .sort((a: Album, b: Album) => b.duration - a.duration);

    }
}
