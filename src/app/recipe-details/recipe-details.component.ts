import { Component, Signal } from '@angular/core';
import { SharedDataService } from '../core/services/shared-data.service';
import { Recipe } from '../core/model/recipe.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent {
  selectedRecipe: Signal<Recipe | undefined>

  constructor(private sharedService: SharedDataService) {
    this.selectedRecipe = this.sharedService.selectedRecipe;
  }

  ngOnInit(): void {
  }

}
