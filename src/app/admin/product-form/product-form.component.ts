import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CategoryService } from './../../category.service';
import { ProductService } from './../../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
      this.categories$ = categoryService.getCategories();
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        // tslint:disable-next-line: deprecation
        this.productService.get(id).pipe(take(1)).subscribe(p => this.product = p);
      }
  }

  ngOnInit(): void {
  }

  save(product): void {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

}
