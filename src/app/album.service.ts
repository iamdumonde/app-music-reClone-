import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environnement } from 'src/environnement/environnement';
import { Album, List, SortAlbumCallback } from './album';
import { ALBUMS, ALBUM_LISTS } from './mock-albums';

// Une classe injectable est un service et peut être recevoir d'autre(s) service(s) 
@Injectable({
    providedIn: 'root' // injecter de manière globale
})
export class AlbumService {

    private _albums: Album[] = ALBUMS // convention private & protected
    private _albumList: List[] = ALBUM_LISTS

    // Observable qui notifie aux abonnés la page actuelle
    sendCurrentNumberPage = new Subject<number>();

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

    order(callback: SortAlbumCallback) {
        this._albums.sort((a: Album ,b: Album) => b.duration - a.duration)
        return this; // retourne le service pour permettre le chainage de méthodes
    }

    limit (start: number, end: number): AlbumService {
        this._albums = this._albums.slice(start, end)
        return this;
    }

    // paginate(start: number, end: number): Album[] {
    //     return this._albums
    //         .slice(start, end)
    //         .sort((a: Album, b: Album) => b.duration - a.duration);

    // }

    search(word: string): Album[] {
        return this._albums.filter(album => {return album.title
            .toLowerCase()
            .includes(word.trim().toLowerCase());
        });
    }
    // const j = Math.floor(Math.random() * (i + 1);
    // [songs[i], songs[j]] = )

    // searchV2(word: string): Album[] {
    //     let re = new RegExp(word.trim(), "g");
    //     return this._albums.filter(album => album.title.match(re));
    // }


    /**
     * Méthode qui renvoi le nombre d'album qu'on  aura par page
     * @returns 
     */
    paginateNumberPage(): number {
        return environnement.numberPage;
    }

    /**
     * Méthode qui signale à tous les composants la page actuelle
     * @param numberPage 
     * @returns 
     */
    currentPage(numberPage: number) {
        return this.sendCurrentNumberPage.next(numberPage);
    }
}
