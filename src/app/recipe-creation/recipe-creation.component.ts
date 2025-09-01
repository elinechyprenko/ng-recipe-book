import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Recipe } from '../core/model/recipe.model';
import { CommonModule } from '@angular/common';
import { RecipesService } from '../core/services/recipes.service';
import { BehaviorSubject, catchError, concatMap, distinctUntilChanged, exhaustMap, finalize, forkJoin, of, Subject, switchMap, tap } from 'rxjs';
import { UploadRecipesPreviewServiceService } from '../core/services/upload-recipes-preview-service.service';

@Component({
  selector: 'app-recipe-creation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-creation.component.html',
  styleUrl: './recipe-creation.component.scss'
})
export class RecipeCreationComponent {

  recipeForm: FormGroup | any = '';
  valueChanges$: any;
  private searchTerms = new BehaviorSubject<string>('');
  selectedFiles: File[] = [];
  uploadedFilesSubject$ = new BehaviorSubject<File[]>([]);
  counter: number = 0;
  uploadProgress: number = 0;
  private saveClick = new Subject<Boolean>();
  saveClick$ = this.saveClick.pipe(exhaustMap(() => this.service.saveRecipe(<Recipe>this.recipeForm.value)));

  tagValues$ = this.searchTerms.pipe(
    distinctUntilChanged(),
    switchMap((term: string) => this.service.getTags$(term))
  )

  constructor(private fb: FormBuilder, private service: RecipesService, private UploadService: UploadRecipesPreviewServiceService) {
    this.recipeForm = this.fb.group<Recipe>({
      id: Math.floor(1000 + Math.random() * 9000),
      title: '',
      ingredients: '',
      tags: '',
      imageUrl: '',
      cookingTime: undefined,
      yield: 0,
      prepTime: undefined,
      steps: '',
    });
  }
  ngOnInit(): void {
    this.valueChanges$ = this.recipeForm.valueChanges.pipe(
      distinctUntilChanged(),
      concatMap(formValue => this.service.saveRecipe(<Recipe>formValue)),
      catchError(errors => of(errors)),
      tap(result => this.saveSuccess(<Recipe>result))
    )
  }
  saveSuccess(_result: Recipe) {
    console.log('Saved successfully');
  }

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerms.next(input.value);
  }

  updateRecipe() {
    this.saveClick.next(true);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
      console.log('Choose file: ', this.selectedFiles)
    }
  }

  OnUpload(files: File[]) {
    this.counter = 0;
    this.uploadProgress = 0;
    this.uploadedFilesSubject$.next(files);
  }

  uploadRecipeImages$ = this.uploadedFilesSubject$.pipe(
    switchMap(uploadedFiles => forkJoin(
      uploadedFiles.map((file: File) => this.UploadService.upload(this.recipeForm.value.id, file)
        .pipe(
          catchError(errors => of(errors)),
          finalize(() => this.calculateProgressPercentage(++this.counter, uploadedFiles.length))
        ))
    )
    )
  )
  calculateProgressPercentage(completedRequests: number, totalRequests: number) {
    this.uploadProgress = Math.round((completedRequests / totalRequests) * 100)
  }

  clear() {
    this.recipeForm.reset()
  }

}
