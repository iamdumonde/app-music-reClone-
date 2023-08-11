import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album, List } from './album';
import * as _ from 'lodash';
import { update } from 'lodash';

// Une classe injectable est un service et peut être recevoir d'autre(s) service(s) 
@Injectable({
    providedIn: 'root' // injecter de manière globale
})
export class AlbumService {

    private _albumsUrl: string = environment.albumUrl; // convention private & protected
    private _albumListUrl: string = environment.albumListUrl;

    subjectAlbum = new Subject<Album>();
    // Observable qui notifie aux abonnés la page actuelle
    sendCurrentNumberPage = new Subject<number>();

    constructor(private http: HttpClient) { }

    /**
     * Fonctions de recherche de tout les albums
     * @returns Retourne la liste de tous les albums
     */
    getAlbums(): Observable<Album[]> {

        return this.http.get<Album[]>(this._albumsUrl).pipe(
        /**Référence de la DB */
        // const albumRef = ref(this.db, 'albums');
        // return objectVal<Album[]>(albumRef).pipe(
        //     map(albums => {
        //         return albums.sort((a, b) => b.duration - a.duration);
        //     })
        );
    }


    /**
     * 
     * @param id identifiant de l'album à rechercher
     * @returns Retourne l'album correspondant; undefined si l'identifiant ne correspond
     */
    getAlbum(id: string): Observable<Album> | undefined {
        return this.http.get<Album>(this._albumsUrl + '/' + id).pipe(
            // équivalent => http.get<Album>(this._albumUrl + "/albums/id")
            // const albumRef = ref(this.db, `albums/${id}`);
            // return objectVal<Album>(albumRef).pipe(
            // map((album) => album)
        );
    }

    /**
     * 
     * @param id id à rechercher
     * @returns La référence sera retourné si elle existe; undefined si l'id n'existe pas dans la liste.
     */
    getAlbumList(id: string): Observable<List> | undefined {
        // return this._albumList.find(list => list.id === id)
        return this.http.get<List>(this._albumListUrl + '/' + id);
        // const albumListRef = ref(this.db, `albumList/${id}`);
        // return objectVal<List>(albumListRef)
    }

    /**
     * Fonction qui retourne le nombre d'albums
     * @returns Le nombre d'albums
     */
    count(): Observable<number> {
        return this.http.get<Album[]>(this._albumsUrl).pipe(
            // const albumsRef = ref(this.db, `albums`);
            // return objectVal<Album>(albumsRef).pipe(
            map((album: Album[]) => album.length)
        )
    }

    // order(callback: SortAlbumCallback) {
    //     this._albums.sort((a: Album ,b: Album) => b.duration - a.duration)
    //     return this; // retourne le service pour permettre le chainage de méthodes
    // }

    // limit (start: number, end: number): AlbumService {
    //     this._albums = this._albums.slice(start, end)
    //     return this;
    // }

    paginate(start: number, end: number): Observable<Album[]> {
        return this.http.get<Album[]>(this._albumsUrl).pipe(
            // const albumsRef = ref(this.db, `albums`);
            // return objectVal<Album[]>(albumsRef).pipe(
            // map((albums: Album[]) => {
            //     const res = _.values(albums)
            //     console.log('sans lodash', albums);
            //     console.log('avec lodash', res);

            //     return res;
            // }),

            map((albums) => albums.sort((a, b) => b.duration - a.duration)
                .slice(start, end))
        );
    }

    /**
     * Type de requête 
     * get => récupérer une ressource
     * post => envoyer une ressource
     * put => m-à-j une ressource
     */

    search(word: string): Observable<Album[]> {
        return this.http.get<Album[]>(this._albumsUrl).pipe(
            // return objectVal<Album[]>(ref(this.db, 'albums')).pipe(
            map((albums: Album[]) => {
                // parcourir le tableau d'albums
                return albums.filter(album => {
                    // retourner ceux contenant le string de la variable "word"
                    return album.title
                        .toLowerCase()
                        .includes(word.trim().toLowerCase());
                })
            })
        )
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
        return environment.numberPage;
    }

    /**
     * Méthode qui signale à tous les composants la page actuelle
     * @param numberPage 
     * @returns 
     */
    currentPage(numberPage: number) {
        return this.sendCurrentNumberPage.next(numberPage);
    }

    /**Méthode qui permet de changer le status d'un album à "on"
     * @param album: l'album dont le status doit passer à "on"
     */
    switchOn(album: Album) {
        album.status = "on";
        this.http.put<void>(this._albumsUrl + '/' + album.id, album)
        // const albumRef = ref(this.sendCurrentNumberPage, "albums/" = album.id);
        // update(ref(this.db, `albums/${allbum}`))
            .subscribe({
                next: (e) => console.log(e),
                error: (err) => console.warn(err),
                complete: () => this.subjectAlbum.next(album),
            })
    }

    /**Méthode qui permet de changer le status d'un album à "off"
     * @param album: l'album dont le status doit passer à "off"
     */
    switchOff(album: Album): void {
        album.status = 'off';
        this.http.put<void>(this._albumsUrl = '/' + album.id, album).subscribe(() => { });
    }
}
