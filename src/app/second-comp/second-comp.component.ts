import { Component, Input, OnInit } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-second-comp',
  templateUrl: './second-comp.component.html',
  styleUrls: ['./second-comp.component.css']
})
export class SecondCompComponent implements OnInit {
  enteredText: string = ' ';
  @Input() send: string | undefined ;
  constructor(
    private testService: TestService
  ) {}
  ngOnInit(): void {
    // souscrire 
    this.testService.dataEmitter.subscribe((data) => {
      this.enteredText = data;
    });
  }
}
