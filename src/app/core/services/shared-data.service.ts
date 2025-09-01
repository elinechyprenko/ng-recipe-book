import { Injectable, signal } from '@angular/core';
import { filter, switchMap } from 'rxjs';
import { Recipe } from '../model/recipe.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  selectedRecipeId = signal<number | undefined>(undefined);
  recipe$ = toObservable(this.selectedRecipeId).pipe(
    filter(Boolean),
    switchMap(id => this.http.get<Recipe>(`${BASE_PATH}/recipes/${id}`))
  )
  selectedRecipe = toSignal(this.recipe$);

  constructor(private http: HttpClient) { }

  updateSelectedRecipe(recipeId: number | undefined) {
    this.selectedRecipeId.set(recipeId);
  }

}


