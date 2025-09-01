import { Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeCreationComponent } from './recipe-creation/recipe-creation.component';
import { HomeComponent } from './home/home.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

export const routes: Routes = [
    {path: 'recipe', component: HomeComponent},
    {path: 'create', component: RecipeCreationComponent},
    {path: 'recipe/details', component: RecipeDetailsComponent},
    {path: '', redirectTo: 'recipe', pathMatch: 'full'}
];
