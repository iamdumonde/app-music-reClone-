import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/album';
import { AlbumService } from 'src/app/album.service';

@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
    albums!: Album[];
    message!: string | undefined;

    constructor(private aS: AlbumService,
        private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.aS.paginate(0, this.aS.paginateNumberPage()).subscribe({
            next: (alb: Album[]) => {
                console.log('get<Album[]>', alb);
                this.albums = alb},
        });

        this.route.queryParams.subscribe(params => {
           this.message = params['message']
            console.log(params);
            
    })
    }


    onSetPaginate($event: { start: number, end: number }) {
            // Récuperer les albums compris entre [start, end]
            this.aS.paginate($event.start,  $event.end).subscribe({
                next: (alb: Album[]) => this.albums = alb,
            })
        }
}
