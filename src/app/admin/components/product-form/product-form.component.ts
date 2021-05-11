import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CategoryService } from '@shared/services/category.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: any = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
    ) {
      this.categories$ = categoryService.getAll();
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id) {
        // tslint:disable-next-line: deprecation
        this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p);
      }
  }

  ngOnInit(): void {
  }

  save(product): void {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }

    this.router.navigate(['/admin/products']);
  }

  delete(): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

}
