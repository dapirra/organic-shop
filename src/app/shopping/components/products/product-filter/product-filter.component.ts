import { Component, Input } from '@angular/core';
import { CategoryService } from '@shared/services/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'product-filter', // tslint:disable-line: component-selector
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {
  categories$: Observable<unknown[]>;
  @Input('category') category; // tslint:disable-line: no-input-rename

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();
  }
}
