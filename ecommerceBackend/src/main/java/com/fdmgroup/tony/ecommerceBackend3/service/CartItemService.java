package com.fdmgroup.tony.ecommerceBackend3.service;

import com.fdmgroup.tony.ecommerceBackend3.model.CartItem;
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
public class CartItemService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;

    @Autowired
    public CartItemService(UserRepository userRepository, ProductRepository productRepository, CartItemRepository cartItemRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.cartItemRepository = cartItemRepository;
    }


    public List<CartItem> getCartItemByUsername(String username) {

        Optional<User> userOptional = userRepository.findByUsername(username);
        if(userOptional.isEmpty()){
            throw new IllegalStateException("User " + username + " not found.");
        }
        return cartItemRepository.findByUser(userOptional.get());
    }

    public Optional<CartItem> createCartItem(String username, Long productId, int quantity) {

        if(quantity <= 0){
            throw new IllegalStateException("Quantity must be positive.");
        }

        Optional<User> userOptional = userRepository.findByUsername(username);
        if(userOptional.isEmpty()){
            throw new IllegalStateException("User " + username + " not found.");
        }

        Optional<Product> productOptional = productRepository.findById(productId);
        if(productOptional.isEmpty()){
            throw new IllegalStateException("Product not found.");
        }
        Optional<CartItem> cartItemOptional = cartItemRepository.findByUserAndProduct(userOptional.get(), productOptional.get());
        if(cartItemOptional.isPresent()){
            throw new IllegalStateException("Product is already in shopping cart. Use PUT request instead.");
        }
        return Optional.of(cartItemRepository.save(new CartItem(userOptional.get(), productOptional.get(), quantity)));

    }

    public void deleteCartItem(Long cartItemId, String username) {

        Optional<User> userOptional = userRepository.findByUsername(username);
        if(userOptional.isEmpty()){
            throw new IllegalStateException("User " + username + " not found.");
        }
        User user = userOptional.get();
        if(cartItemRepository.findById(cartItemId).isEmpty()) {
            throw new IllegalStateException("Cart item not found.");
        }

        if(cartItemRepository.findByCartItemIdAndUser(cartItemId, user).isEmpty()) {
            throw new IllegalStateException("You cannot delete other people's cart item.");
        }
        cartItemRepository.deleteById(cartItemId);
    }

    @Transactional
    public CartItem updateCartItemQuantity(Long cartItemId, String username, int quantity) {

        if(quantity <= 0 ){
            throw new IllegalStateException("Shopping cart item quantity must be positive.");
        }

        CartItem cartItem =cartItemRepository.findById(cartItemId).orElseThrow(() ->
                new IllegalStateException("Shopping cart item not found."));
        if(quantity == cartItem.getQuantity() ) {
            throw new IllegalStateException("Same quantity.");
        }

        Optional<User> userOptional = userRepository.findByUsername(username);

        if(userOptional.isEmpty()){
            throw new IllegalStateException("User " + username + " not found.");
        }
        User user = userOptional.get();
        if(cartItemRepository.findByCartItemIdAndUser(cartItemId, user).isEmpty()) {
            throw new IllegalStateException("You cannot modify other people's shopping cart.");
        }

        cartItem.setQuantity(quantity);
        return cartItem;
    }

    @Transactional
    public  Optional<CartItem> incrementCartItemQuantity(String username, Long productId, int quantity) {

        Optional<User> userOptional = userRepository.findByUsername(username);
        if(userOptional.isEmpty()){
            throw new IllegalStateException("User " + username + " not found.");
        }

        Optional<Product> productOptional = productRepository.findById(productId);
        if(productOptional.isEmpty()){
            throw new IllegalStateException("Product not found.");
        }
        Optional<CartItem> cartItemOptional = cartItemRepository.findByUserAndProduct(userOptional.get(), productOptional.get());
        if(cartItemOptional.isEmpty()){
            throw new IllegalStateException("Product is not in shopping cart. Use POST request instead.");
        }

        CartItem cartItem = cartItemOptional.get();
        int newQuantity = cartItem.getQuantity() + quantity;
        if( newQuantity <= 0){
            throw new IllegalStateException("The resulting quantity must be positive.");
        }
        cartItemRepository.updateQuantity(cartItem.getCartItemId(),newQuantity);
        return cartItemRepository.findById(cartItem.getCartItemId());


    }

    @Transactional
    public void deleteAllByUsername(String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if(userOptional.isEmpty()){
            throw new IllegalStateException("User " + username + " not found.");
        }
        User user = userOptional.get();
        cartItemRepository.deleteByUser(user);

    }
}
