package com.fdmgroup.tony.ecommerceBackend3.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ShoppingCart")
public class CartItem {
    @Id
    @SequenceGenerator(name = "cartItem_sequence",sequenceName = "cartItem_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cartItem_sequence")
    private long cartItemId;

    @ManyToOne
    @JoinColumn(name = "FK_USER_ID")
    private User user;

    public CartItem() {
        super();
    }

    @OneToOne
    @JoinColumn(name = "FK_PRODUCT_ID")
    private Product product;

    private int quantity;

    public CartItem(User user, Product product, int quantity) {
        this.user = user;
        this.product = product;
        this.quantity = quantity;
    }

    public long getCartItemId() {
        return cartItemId;
    }

    public void setCartItemId(long cartItemId) {
        this.cartItemId = cartItemId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

}
