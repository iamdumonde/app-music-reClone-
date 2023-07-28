import { Component, HostBinding, Input } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: '/app.component.html',
  styleUrls: ['/app.component.css'],
  animations: [
    // animation triggers ...
  ]
})
export class AppComponent {
  title = 'app-music';
  receivedText: string | undefined;

  parentReceive($event: string) {
    // console.log('parent: '+ $event);
    this.receivedText = $event;
    
}
}
