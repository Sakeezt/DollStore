import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BookService } from '../../../services/book.service'

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  productForm = new FormGroup({
    product_name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required]),
    promotion: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
  });

  
  previewLoaded: boolean = false;

  constructor(private ps: BookService) { }

  ngOnInit(): void {
  }

  addProduct() {
    this.ps.addProduct(this.productForm.value).subscribe(
      data => {
        console.log(data)
        alert('Product added successfully');
        this.productForm.reset();
      },
      err => {
        console.log(err);
      }
    );
  }

  onChangeImg(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      var pattern = /image-*/;
      const reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('Invalid format');
        this.productForm.reset();
      } else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.previewLoaded = true;
          this.productForm.patchValue({
            img: reader.result?.toString()
          });
        };
      }
    }
  }

  resetForm() {
    this.productForm.reset();
    this.previewLoaded = false;
  }

}
