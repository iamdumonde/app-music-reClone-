import { trigger, transition, state, style, animate } from "@angular/animations";

export const fadeInAnimation = trigger('fadeInAnimation', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 }))
    ])
])

export const detailsAnimation = trigger('detailsAnimation', [
    state('open', style({
      backgroundColor: 'yellow'
    })),
    state('closed', style({
      backgroundColor: 'blue'
    })),
    transition('open => closed', [
      animate('1s')
    ]),
    transition('closed => open', [
      animate('2s')
    ]),
    
  ])