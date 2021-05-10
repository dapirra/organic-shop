import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'product-filter', // tslint:disable-line: component-selector
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input('category') category; // tslint:disable-line: no-input-rename

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();
  }

  ngOnInit(): void {
  }

}
