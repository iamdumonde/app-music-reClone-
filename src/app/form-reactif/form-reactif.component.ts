import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-form-reactif',
	templateUrl: './form-reactif.component.html',
	styleUrls: ['./form-reactif.component.css']
})
export class FormReactifComponent {
	constructor(private fb: FormBuilder) {}

	genres = ['Jazz', 'Rap', 'AfroTrap', 'Hip Pop', 'Pop'];
	musicForm = this.fb.group({
		name: ['', [Validators.required, Validators.minLength(4)]],
		auteur: ['', Validators.required],
		style: [this.genres[0]]
	});

	get name() {return this.musicForm.get("name");}
	get auteur() {return this.musicForm.get("auteur");}
	get style() {return this.musicForm.get("style");}

	onSubmit() {
		console.warn(this.musicForm.value)
	}
}
