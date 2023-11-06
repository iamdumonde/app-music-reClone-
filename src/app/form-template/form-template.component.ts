import { Component } from '@angular/core';
import { Music } from '../music';

@Component({
    selector: 'app-form-template',
    templateUrl: './form-template.component.html',
    styleUrls: ['./form-template.component.css']
})
export class FormTemplateComponent {
    genres = ['Jazz', 'Rap', 'AfroTrap', 'Hip Pop', 'Pop'];
    musicModel = new Music('', '', '');
    submitted = false;
    onSubmit(form: any) {
        console.log(form);
        this.submitted = true;

    }

    /**
     *  Visité: touched | untouched
     *  Changé: dirty | pristine
     *  Valid: valid | invalid
     * 
     * FormGroup
     *    -> FormControl
     *    -> FormControl
     *    -> FormControl
     */

}
