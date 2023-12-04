package com.fdmgroup.tony.ecommerceBackend3.model;

import jakarta.persistence.*;


@Entity
@Table(name = "orders")
public class Order {
    @Id
    @SequenceGenerator(name = "order_sequence",sequenceName = "order_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_sequence")
    private int orderId;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "FK_ORDERPRODUCT_ID")
    private OrderProduct orderProduct;

    @ManyToOne
    @JoinColumn(name = "FK_USER_ID")
    private User user;

    private int boughtQuantity;

    public Order() {
    }

    public Order( OrderProduct orderProduct, User user, int boughtQuantity) {

        this.orderProduct = orderProduct;
        this.user = user;
        this.boughtQuantity = boughtQuantity;
    }


    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public OrderProduct getOrderProduct() {
        return orderProduct;
    }

    public void setOrderProduct(OrderProduct orderProduct) {
        this.orderProduct = orderProduct;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getBoughtQuantity() {
        return boughtQuantity;
    }

    public void setBoughtQuantity(int boughtQuantity) {
        this.boughtQuantity = boughtQuantity;
    }
}
