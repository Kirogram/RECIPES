import {Routes} from '@angular/router';
import {MainComponent} from "./main/main.component";
import {DetailRecipesComponent} from "./pages/detail-recipes/detail-recipes.component";
import {InsertRecipesComponent} from "./pages/insert-recipes/insert-recipes.component";
import {UpdateRecipesComponent} from "./pages/update-recipes/update-recipes.component";
import {InsertYoutubeComponent} from "./pages/insert-youtube/insert-youtube.component";

export const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'detailRecipe', component: DetailRecipesComponent},
  {path: 'insertRecipe', component: InsertRecipesComponent},
  {path: 'updateRecipe', component: UpdateRecipesComponent},
  {path: 'youtube', component: InsertYoutubeComponent},


];
