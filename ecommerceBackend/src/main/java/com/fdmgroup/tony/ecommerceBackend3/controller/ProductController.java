package com.fdmgroup.tony.ecommerceBackend3.controller;


import com.fdmgroup.tony.ecommerceBackend3.model.Product;
import com.fdmgroup.tony.ecommerceBackend3.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "api/v1/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Product>> getProducts() {
        return new ResponseEntity<>(productService.getProducts(), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity createProduct(@RequestBody Map<String, Object> payLoad){
        try {
            String productName = (String) payLoad.get("productName");
            long createdTime = (long) payLoad.get("createdTime");
            double price = Double.parseDouble((String) payLoad.get("price"));
            String imageURL = (String) payLoad.get("imageURL");
            String description = (String) payLoad.get("description");
            int soldQuantity = (int) payLoad.get("soldQuantity");
            String username = (String) payLoad.get("username");
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(productService.createProduct(productName, createdTime, price, imageURL, description, soldQuantity, username)
                    );
        }
        catch(ClassCastException | NullPointerException  e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Product contains invalid input: "+e.getMessage()
                    );
        }
        catch(NumberFormatException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Price need to be a number: "+e.getMessage()
                    );
        }
        catch(IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage()
                    );
        }
        catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }

    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable("productId") Long productId, @RequestParam String username) {
        try {
            productService.deleteProduct(productId, username);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Product deleted."
                    );
        } catch(IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage()
                    );
        }
    }

    @PutMapping("/price/{productId}")
    public ResponseEntity updateProductPrice(@PathVariable("productId") Long productId, @RequestParam String username,
                                        @RequestParam Double price) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(productService.updateProductPrice(productId, username, price)
                    );
        }
        catch(IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage()
                    );
        }
        catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }

    }

    @PutMapping("/soldquantity/{productId}")
    public ResponseEntity incrementProductSoldQuantity(@PathVariable("productId") Long productId, @RequestParam String username,
                                                        @RequestParam int incre) {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(productService.incrementProductSoldQuantity(productId, username, incre)
                    );
        }

        catch(IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage()
                    );
        }
        catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }

    }

    @PutMapping("/{productId}")
    public ResponseEntity updateProduct(@PathVariable("productId") Long productId,
                                        @RequestBody Map<String, Object> payLoad) {
        try {
            double price = (double) payLoad.get("price");
            String imageURL = (String) payLoad.get("imageURL");
            String description = (String) payLoad.get("description");
            int soldQuantity = (int) payLoad.get("soldQuantity");
            return ResponseEntity.status(HttpStatus.OK)
                    .body(productService.updateProduct(productId, price, imageURL, description, soldQuantity)
                    );
        }
        catch(ClassCastException | NullPointerException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Product contains invalid input."
                    );
        }
        catch(IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage()
                    );
        }

    }
}
