import { Component } from '@angular/core';
import { HeaderComponent } from "../core/header/header.component";
import { RecipeListComponent } from "../recipe-list/recipe-list.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecipeListComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
