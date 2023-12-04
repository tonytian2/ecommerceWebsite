package com.fdmgroup.tony.ecommerceBackend3.controller;

import com.fdmgroup.tony.ecommerceBackend3.model.CartItem;
import com.fdmgroup.tony.ecommerceBackend3.model.Product;
import com.fdmgroup.tony.ecommerceBackend3.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/shoppingcart")
public class CartItemController {

    private final CartItemService cartItemService;

    @Autowired
    public CartItemController(CartItemService cartItemService) {
        this.cartItemService = cartItemService;
    }

    @GetMapping("/")
    public ResponseEntity getCartItemByUsername(@RequestParam String username) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(cartItemService.getCartItemByUsername(username));
        }catch(IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/")
    public ResponseEntity createCartItem(@RequestParam String username, @RequestParam Long productId,
                                         @RequestParam int quantity) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(cartItemService.createCartItem(username, productId, quantity ));
        }catch(IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/")
    public ResponseEntity incrementCartItemQuantity(@RequestParam String username, @RequestParam Long productId,
                                                @RequestParam int quantity) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(cartItemService.incrementCartItemQuantity(username, productId, quantity ));
        }catch(IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<String> deleteCartItem(@PathVariable("cartItemId") Long cartItemId, @RequestParam String username) {
        try {
            cartItemService.deleteCartItem(cartItemId, username);
            return ResponseEntity.status(HttpStatus.OK).body("Cart item deleted.");
        }catch(IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/quantity/{cartItemId}")
    public ResponseEntity updateCartItemQuantity(@PathVariable("cartItemId") Long cartItemId, @RequestParam String username,
                                             @RequestParam int quantity) {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(cartItemService.updateCartItemQuantity(cartItemId, username, quantity)
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

    @DeleteMapping("/deleteall")
    public ResponseEntity<String> deleteCartItemByUsername( @RequestParam String username)
    {
        try {
            cartItemService.deleteAllByUsername(username);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("User "+ username + " shopping cart cleared."
                    );
        }catch(IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage()
                    );
        }

    }



}
