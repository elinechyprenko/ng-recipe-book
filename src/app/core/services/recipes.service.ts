import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { from, Observable, ReplaySubject, share, switchMap, timer } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Tag } from '../model/tags';
import { toSignal } from '@angular/core/rxjs-interop';


const BASE_PATH = environment.basePath;
const REFRESH_INTERVAL = 50000;
const timer$ = timer(0, REFRESH_INTERVAL);

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  
  recipes$: Observable<Recipe[]>;
  filterRecipe = signal({ title: '' } as Recipe)
  recipes: Signal<Recipe[]>;
  selectedTags = from(['Salty', 'Sweet', 'Healthy']);

  constructor(private http: HttpClient) {
    this.recipes$ = timer$.pipe(
      switchMap(_ => this.http.get<Recipe[]>(`${BASE_PATH}/recipes`)),
      share({
        connector: () => new ReplaySubject(1),
        resetOnRefCountZero: true,
        resetOnComplete: true,
        resetOnError: true
      })
    )
    this.recipes = toSignal(this.recipes$, { initialValue: [] as Recipe[] })
  }

  updateFilter(criteria: Recipe) {
    this.filterRecipe.set(criteria);
  }

  getTags$: (term: string) => Observable<Tag[]> =
    (term: string) => {
      return this.http.get<Tag[]>(`${BASE_PATH}/tags`,
        { params: { criteria: term } }
      )
    }

  getRecipesByTag(tag: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${BASE_PATH}/recipesByTags`, {
      params: { criteria: tag }
    })
  }

  saveRecipe(formValue: Recipe): Observable<Recipe> {
    console.log(formValue)
    return this.http.post<Recipe>(`${BASE_PATH}/recipes/save`, formValue)
  }
}


