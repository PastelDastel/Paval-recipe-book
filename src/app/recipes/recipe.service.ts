import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../data.storage.service';
import { Observable, catchError, map, of, tap } from 'rxjs';
@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new EventEmitter<Recipe[]>();
  recipe: Recipe;
  private recipes: Recipe[] = [];

  constructor(
    private slService: ShoppingListService,
    private dataStorageService: DataStorageService
  ) {}

  getRecipes(): Observable<Recipe[]> {
    return this.dataStorageService.sendGetRequest('recipes').pipe(
      map((data: any) => {
        console.log(data);
        return data as Recipe[];
      }),
      catchError((error: any) => {
        console.log(error);
        window.alert('ERROR: ' + error);
        return of([]); // Default return value or empty array for error case
      })
    );
  }
  
  getRecipe(id) : Observable<Recipe>{
    return this.dataStorageService.sendGetRequest('recipes/' + id).pipe(
      map((data: any) => {
        console.log(data);
        return data as Recipe;
      }),
      catchError((error: any) => {
        console.log(error);
        window.alert('ERROR: ' + error);
        return of(null); // Default return value or null for error case
      })
    );
  }
  
  postRecipe(body: any): Observable<Recipe> {
    return this.dataStorageService.sendPostRequest('recipes/', body).pipe(
      tap((data: any) => {
        console.log(data);
        this.recipe = data;
      }),
      catchError((error: any) => {
        console.log(error);
        window.alert('ERROR: ' + error);
        return of(null); // Default return value or null for error case
      })
    );
  }
  
  putRecipe(id: string, body: any): Observable<Recipe> {
    return this.dataStorageService.sendPutRequest('recipes/' + id, body).pipe(
      tap((data: any) => {
        console.log(data);
        this.recipe = data;
      }),
      catchError((error: any) => {
        console.log(error);
        window.alert('ERROR: ' + error);
        return of(null); // Default return value or null for error case
      })
    );
  }
  
  deleteRecipe(id): Observable<any> {
    return this.dataStorageService.sendDeleteRequest('recipe/' + id).pipe(
      tap((data: any) => {
        console.log(data);
        this.recipe = data;
      }),
      catchError((error: any) => {
        console.log(error);
        window.alert('ERROR: ' + error);
        return of(null); // Default return value or null for error case
      })
    );
  }
  
  addIngredientsToList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
}
}
