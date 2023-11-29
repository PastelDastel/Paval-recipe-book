import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDifficulty !: number;
    let recipeIngredients = new FormArray([]);
    
    if (this.editMode) {
      this.recipeService.getRecipe(this.id).subscribe(recipe => {
        recipeName = recipe.Name;
        recipeImagePath = recipe.UrlImage;
        recipeDifficulty = recipe.Difficulty;
        if (recipe['ingredients']) {
          for (let ingredient of recipe.Ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            );
          }
        }
      });
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName , Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'difficulty': new FormControl(recipeDifficulty, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  // onSubmit(){
  //   if (this.editMode) {
  //     this.recipeService.updateRecipe(this.id, this.recipeForm.value);
  //   } else {
  //     this.recipeService.addRecipe(this.recipeForm.value);
  //   }
  //   this.onCancel();
  // }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  onSubmit() {
    throw new Error('Method not implemented.');
    }
}
