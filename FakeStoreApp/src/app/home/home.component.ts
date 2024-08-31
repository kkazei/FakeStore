import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  categories: string[] = [];
  editingProduct: any = null; 
  addingProduct: boolean = false; 
  newProduct: any = {}; 
  selectedProduct: any = null; 

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadAllProducts();
    this.loadCategories();
  }

  loadAllProducts(): void {
    this.productService.getAllProducts().subscribe((data: any[]) => {
      this.products = data;
    });
  }

  loadLimitedProducts(limit: number): void {
    this.productService.getLimitedProducts(limit).subscribe((data: any[]) => {
      this.products = data;
    });
  }

  sortProducts(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const sortBy = selectElement.value;
  
    if (sortBy === 'lowToHigh') {
      this.products.sort((a: any, b: any) => a.price - b.price);
    } else if (sortBy === 'highToLow') {
      this.products.sort((a: any, b: any) => b.price - a.price);
    } else {
      this.reloadProducts();
    }
  }
  
  filterByCategory(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const category = selectElement.value;
  
    if (category) {
      this.productService.getProductsByCategory(category).subscribe((data: any[]) => {
        this.products = data;
      });
    } else {
      this.reloadProducts();
    }
  }
  
  reloadProducts(): void {
    this.loadAllProducts();
  }
  
  loadCategories(): void {
    this.productService.getAllCategories().subscribe((data: any[]) => {
      this.categories = data;
    });
  }

  getProductDetails(id: number): void {
    this.productService.getProductById(id).subscribe((data: any) => {
      this.selectedProduct = data; 
    });
  }

  closeDetails(): void {
    this.selectedProduct = null; 
  }


  showAddProductForm(): void {
    this.addingProduct = true;
    this.newProduct = {}; 
  }

  addProduct(): void {
    if (this.newProduct) {
      this.productService.addProduct(this.newProduct).subscribe((data: any) => {
        console.log('Product added:', data);
        this.products.push(data);
        this.cancelAdd();
      });
    }
  }

  editProduct(product: any): void {
    this.editingProduct = { ...product };
  }

  updateProduct(): void {
    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct.id, this.editingProduct).subscribe((updatedProduct: any) => {
        console.log('Product updated:', updatedProduct);
        const index = this.products.findIndex(product => product.id === updatedProduct.id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
        this.cancelEdit();
      });
    }
  }

  cancelEdit(): void {
    this.editingProduct = null;
  }

  cancelAdd(): void {
    this.addingProduct = false;
    this.newProduct = {}; 
  }

  patchProduct(id: number, partialProduct: any): void {
    this.productService.patchProduct(id, partialProduct).subscribe((data: any) => {
      console.log('Product partially updated:', data);
      this.reloadProducts();
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      console.log('Product deleted');
      this.products = this.products.filter(product => product.id !== id);
    });
  }
}
