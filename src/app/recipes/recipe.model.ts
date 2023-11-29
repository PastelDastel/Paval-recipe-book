import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    Id: number;
    Name: string;
    ExecutionTime: number;
    Difficulty: number;
    Ingredients: Ingredient[];
    UrlImage: string;


    constructor(id:number, name: string, executionTime: number, difficulty: number, recipeIngredients: Ingredient[], urlImage: string) {
        this.Id = id;
        this.Name = name;
        this.ExecutionTime = executionTime;
        this.Difficulty = difficulty;
        this.Ingredients = recipeIngredients;
        this.UrlImage = urlImage;
    }
}