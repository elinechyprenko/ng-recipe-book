import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Recipe } from '../core/model/recipe.model';
import { RecipesService } from '../core/services/recipes.service';

@Component({
  selector: 'app-recipe-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-filter.component.html',
  styleUrl: './recipe-filter.component.scss',
})
export class RecipeFilterComponent {
  recipeForm: FormGroup | any = '';

  constructor(public fb: FormBuilder, private service: RecipesService) {
    this.recipeForm = this.fb.group<Recipe>({
      title: '',
      ingredients: '',
      tags: '',
      prepTime: undefined,
      cookingTime: undefined,
    })
  }

  filterResults() {
    const criteria = <Recipe>this.recipeForm.value;
    console.log(criteria)
    this.service.updateFilter(criteria);
  }

  clearFilter() {
    this.recipeForm.reset();
  }
}
