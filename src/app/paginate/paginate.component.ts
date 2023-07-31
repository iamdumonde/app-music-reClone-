import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent implements OnInit {
  /**
   * nombre total d'albums
   */
  total: number = 0;
  /**
   * nombre d'albums par page(stocké dans les variables d'environnement)
   */
  perPage: number;

  /**
   * nombre de boutons à générer
   */
  numberPages: number = 0;
  /** Tableau réunissant le label de chaque page */
  pages: number[] = [];
  /** Emetteur d'évènements */
  @Output() setPaginate: EventEmitter<{ start: number, end: number }> = new EventEmitter
  /**Variable qui stocke la page actuelle */
  currentPage: number = 1; // Par défaut

  constructor(
    private albumService: AlbumService
  ) {
    this.perPage = this.albumService.paginateNumberPage();
  }
  ngOnInit(): void {
    this.total = this.albumService.count();
    this.numberPages = Math.ceil(this.total / this.perPage);

    for (let i = 1; i <= this.numberPages; i++) {
      this.pages.push(i);
    }
  }
  
  next(): void {
    // si nous avons déjà atteint la dernière page de pagination
    if (this.currentPage >= this.numberPages) {
        return;
        // this.currentPage = 1; // revenir à la dernière page
    } else { // sinon
        this.currentPage++; // incrémente
    }
    // Demander au parent d'afficher les albums suivants dans la liste
    this.setPaginate.emit(this.setAlbums(this.currentPage));
  }

  previous(): void {
    if(this.currentPage <= 1) {
        return
    } else {
        this.currentPage--;
    }
  }

  /**
   * Fonction qui retourne le sous ensemble d'albums à afficher
   */
  setAlbums(page: number): {start: number, end: number} {
    let start = (page - 1) * this.perPage;
    let end = start + this.perPage;
    
    return {start: start, end: end};
  }

  changePage(page: number) {
    this.currentPage = page;
    // Demanger au parent d'afficher les albums suivants dans la liste
    this.setPaginate.emit(this.setAlbums(this.currentPage));
  }

}
