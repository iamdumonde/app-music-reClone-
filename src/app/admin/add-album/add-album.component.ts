import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, Validator, FormArray } from '@angular/forms';
import { AlbumService } from '../../album.service';
import { Album } from '../../album';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-add-album',
    templateUrl: './add-album.component.html',
    styleUrls: ['./add-album.component.css']
})
export class AddAlbumComponent implements OnInit {
    albumForm!: FormGroup;
    

    constructor(private fb: FormBuilder,
        private router: Router) { }
    ngOnInit(): void {
        this.albumForm = this.fb.group({
            id: '',
            name: ['', [
                Validators.required,
                Validators.minLength(5)
            ]],
            title: ['', [
                Validators.required
            ]],
            ref: ['', [
                Validators.required,
                Validators.pattern('\\w{5}'), // doit avoir 5 caractères
                // Validators.pattern('[a-zA-Z0-0]{5}')
            ]],
            duration: ['', [
                Validators.required,
                Validators.max(900),
                Validators.pattern('[0-9]*') // doit avoir une suite de chiffre 
            ]],
            description: ['', [
                Validators.required
            ]],
            tags: this.fb.array([
                this.fb.control('')
            ]),
            // tags: new FormArray([
            //     new FormControl('')
            // ]),
            status: 'off',
        });
    }
    /**Getters qui seront utilisés pour la validation */
    get name() { return this.albumForm.get('name') }
    get ref() { return this.albumForm.get('ref') }
    get title() { return this.albumForm.get('title') }
    get duration() { return this.albumForm.get('duration') }
    get description() { return this.albumForm.get('description') }
    get tags() { return this.albumForm.get('tags') as FormArray }

    onSubmit() {
        // envoie dans la base de données
        console.log(this.albumForm.value);
        // Rediriger sur la page "admin"
        this.router.navigate(['/admin'], { 
            queryParams: { 
                message: "Album ajouté avec succès" ,
                model: "text-davinci-002-render-sha"
            } 
        });

    }

    addTag() {
        this.tags.push(this.fb.control(''));
    }


}
