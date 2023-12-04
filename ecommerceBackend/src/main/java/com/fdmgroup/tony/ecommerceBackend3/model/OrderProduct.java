package com.fdmgroup.tony.ecommerceBackend3.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "OrderProducts")
public class OrderProduct {

    @Id
    @SequenceGenerator(name = "orderProduct_sequence",sequenceName = "orderProduct_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "orderProduct_sequence")
    private long orderProductId;

    private long productId;

    private long snapshotTime;

    private String productName;

    private String price;

    private String imageURL;



    public OrderProduct() {
    }

    public OrderProduct(long productId, long snapshotTime, String productName, String price, String imageURL) {
        this.productId = productId;
        this.snapshotTime = snapshotTime;

        this.productName = productName;
        this.price = price;
        this.imageURL = imageURL;

    }

    public long getProductId() {
        return productId;
    }

    public void setProductId(long productId) {
        this.productId = productId;
    }

    public long getSnapshotTime() {
        return snapshotTime;
    }

    public void setSnapshotTime(long snapshotTime) {
        this.snapshotTime = snapshotTime;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

}
