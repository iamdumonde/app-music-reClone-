import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/album';
import { AlbumService } from 'src/app/album.service';

@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
    albums!: Album[];

    constructor(private aS: AlbumService) {}

    ngOnInit(): void {
        this.aS.paginate(0, this.aS.paginateNumberPage()).subscribe({
            next: (alb: Album[]) => {
                console.log('get<Album[]>', alb);
                this.albums = alb},
        })
    }


    onSetPaginate($event: { start: number, end: number }) {
            // Récuperer les albums compris entre [start, end]
            this.aS.paginate($event.start,  $event.end).subscribe({
                next: (alb: Album[]) => this.albums = alb,
            })
        }
}
