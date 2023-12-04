package com.fdmgroup.tony.ecommerceBackend3.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "Products")
public class Product {
    @Id
    @SequenceGenerator(name = "product_sequence",sequenceName = "product_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_sequence")
    private long productId;

    private String productName;

    private Timestamp createdTime;

    private double price;

    private String imageURL;
    @Lob
    @Column(length=512)
    private String description;

    private int soldQuantity;

    @ManyToOne
    @JoinColumn(name = "FK_USER_ID")
    private User user;

    public Product() {
        super();
    }

    public Product(String productName, Timestamp createdTime, double price, String imageURL, String description, int soldQuantity, User user) {
        this.productName = productName;
        this.createdTime = createdTime;
        this.price = price;
        this.imageURL = imageURL;
        this.description = description;
        this.soldQuantity = soldQuantity;
        this.user = user;
    }
    public Product(String productName,long createdTime, double price, String imageURL, String description, int soldQuantity, User user) {
        this.productName = productName;
        this.createdTime = new Timestamp(createdTime);
        this.price = price;
        this.imageURL = imageURL;
        this.description = description;
        this.soldQuantity = soldQuantity;
        this.user = user;
    }


    public long getProductId() {
        return productId;
    }

    public void setProductId(long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Timestamp getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Timestamp createdTime) {
        this.createdTime = createdTime;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getSoldQuantity() {
        return soldQuantity;
    }

    public void setSoldQuantity(int soldQuantity) {
        this.soldQuantity = soldQuantity;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}