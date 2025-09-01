import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';
import { RecipesService } from '../core/services/recipes.service';
import { Recipe } from '../core/model/recipe.model';
import { CommonModule } from '@angular/common';
import { RecipeFilterComponent } from '../recipe-filter/recipe-filter.component';
import { SharedDataService } from '../core/services/shared-data.service';
import { Router } from '@angular/router';
import { RealTimeService } from '../core/services/real-time.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RecipeFilterComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListComponent {
  recipes: Signal<Recipe[]>;
  recipesFilter: Signal<Recipe>;
  filteredRecipes: Signal<Recipe[]>

  constructor(private service: RecipesService, private sharedService: SharedDataService, private router: Router, private realTimeService: RealTimeService) {
    this.recipes = this.service.recipes;
    this.recipesFilter = service.filterRecipe;

    this.filteredRecipes = computed(() => {
      const filterTitle = this.recipesFilter().title?.toLocaleLowerCase() ?? '';
      return this.recipes().filter(recipe => recipe.title?.toLocaleLowerCase().includes(filterTitle))
    })
  }

  ngOnInit(): void {
  }

  trackByRecipeId(index: number, recipe: any): number {
    return recipe.id;
  }
  editRecipe(recipe: Recipe) {
    this.sharedService.updateSelectedRecipe(recipe.id);
    this.router.navigate(['/recipe/details']);
  }
}
