import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, NgForm } from "@angular/forms";
import { TestService } from "../test.service";

@Component({
    selector: 'app-first-comp',
    templateUrl: './first-comp.component.html',
    styleUrls: ['./first-comp.component.css'],
})
export class FirstCompComponent {
    constructor(
        private testService: TestService
    ) {}
    @Output () emitter: EventEmitter<string> = new EventEmitter()
    texte = new FormControl(' ');

    onButtonClick(form: NgForm) {
        //  Emettre la valeur du champ vers le parent
        // this.emitter.emit(form.value['texte']);
        
        const inputText = form.value['texte'];
        this.testService.sendData(inputText);
    }
   
}