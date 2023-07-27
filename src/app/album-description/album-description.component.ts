import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../album';
import { AlbumService } from '../album.service';
import { fadeInAnimation } from '../animation.module';

@Component({
  selector: 'app-album-description',
  templateUrl: './album-description.component.html',
  styleUrls: ['./album-description.component.css'],
  animations: [fadeInAnimation]
})
export class AlbumDescriptionComponent implements OnInit {
    album: Album | undefined;
  constructor(
    private route: ActivatedRoute,
    private aS: AlbumService // Service
  ) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'));
    
    // permet de récupérer l'identifiant 
    const id = this.route.snapshot.params['id'];
    console.log(id);
    
    // console.log(this.route.snapshot.paramMap.get('albumId'));

    // TODO: récupérer le détail d'un album
    this.album = this.aS.getAlbum(id);
    console.log(this.album);
    
  }
}
