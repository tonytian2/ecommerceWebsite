package com.fdmgroup.tony.ecommerceBackend3.service;

import com.fdmgroup.tony.ecommerceBackend3.model.Product;
import com.fdmgroup.tony.ecommerceBackend3.model.User;
import com.fdmgroup.tony.ecommerceBackend3.repository.CartItemRepository;
import com.fdmgroup.tony.ecommerceBackend3.repository.ProductRepository;
import com.fdmgroup.tony.ecommerceBackend3.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CartItemRepository cartItemRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, UserRepository userRepository, CartItemRepository cartItemRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.cartItemRepository = cartItemRepository;
    }

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Product createProduct(String productName, long createdTime, double price, String imageURL, String description, int soldQuantity, String username) {

        if(price < 0 || soldQuantity < 0 ){
            throw new IllegalStateException("Product price and soldQuantity cannot be negative.");
        }
        Optional<User> userOptional = userRepository.findByUsername(username);
        if(userOptional.isEmpty()){
            throw new IllegalStateException("User " + username + " not found.");
        }

        User user = userOptional.get();
        if(productRepository.findByProductNameAndUser(productName, user).isPresent()) {
            throw new IllegalStateException("You already have a product with the same name.");
        }

        return productRepository.save(new Product(productName, createdTime, price, imageURL, description, soldQuantity, user));
    }

    @Transactional
    public Optional<Product> updateProduct(Long productId, double price, String imageURL, String description, int soldQuantity) {

        if(price < 0 || soldQuantity < 0 ){
            throw new IllegalStateException("Product price and soldQuantity cannot be negative.");
        }

        Product product = productRepository.findById(productId).orElseThrow(() ->
                new IllegalStateException("Product with id " + productId + " does not exist."));

        productRepository.updateProduct(productId, price, imageURL, description, soldQuantity);
        return productRepository.findById(productId);

    }

    @Transactional
    public void deleteProduct(Long productId, String username){
        Optional<User> userOptional = userRepository.findByUsername(username);
        if(userOptional.isEmpty()){
            throw new IllegalStateException("User " + username + " not found.");
        }
        User user = userOptional.get();
        Optional<Product> productOptional = productRepository.findById(productId);
        if(productOptional.isEmpty()) {
            throw new IllegalStateException("Product with id " + productId + " not found.");
        }

        if(productRepository.findByProductIdAndUser(productId, user).isEmpty()) {
            throw new IllegalStateException("You cannot delete other people's product.");
        }
        cartItemRepository.deleteByProduct(productOptional.get());
        productRepository.deleteById(productId);
    }

    @Transactional
    public Product updateProductPrice(Long productId, String username, double price) {

        if(price < 0 ){
            throw new IllegalStateException("Product price cannot be negative.");
        }
        Product product = productRepository.findById(productId).orElseThrow(() ->
                new IllegalStateException("Product not found."));

        if(price == product.getPrice() ) {
            throw new IllegalStateException("Same price.");
        }
        Optional<User> userOptional = userRepository.findByUsername(username);

        if(userOptional.isEmpty()){
            throw new IllegalStateException("User " + username + " not found.");
        }

        User user = userOptional.get();

        if(productRepository.findByProductIdAndUser(productId, user).isEmpty()) {
            throw new IllegalStateException("You cannot modify other people's product.");
        }

        product.setPrice(price);
        return product;
    }

    @Transactional
    public Product incrementProductSoldQuantity(Long productId, String username, int incre) {

        Product product = productRepository.findById(productId).orElseThrow(() ->
                new IllegalStateException("Product with id " + productId + " not found."));

        if(!username.equals("buyer")){
            throw new IllegalStateException("You cannot modify sold quantity.");
        }
        int newQuantity = product.getSoldQuantity() + incre;
        if(newQuantity < 0) {
            throw new IllegalStateException("Product sold quantity cannot be negative.");
        }
        product.setSoldQuantity(newQuantity);
        return product;
    }
}
