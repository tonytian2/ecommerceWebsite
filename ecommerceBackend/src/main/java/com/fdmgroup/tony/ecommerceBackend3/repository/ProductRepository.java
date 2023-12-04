package com.fdmgroup.tony.ecommerceBackend3.repository;

import com.fdmgroup.tony.ecommerceBackend3.model.Product;
import com.fdmgroup.tony.ecommerceBackend3.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("Select p from Product p WHERE p.user = :user AND p.productName = :productName")
    public Optional<Product> findByProductNameAndUser(String productName, User user);

    @Query("Select p from Product p WHERE p.user = :user AND p.productId = :productId")
    public Optional<Product> findByProductIdAndUser(Long productId, User user);

    @Modifying(clearAutomatically=true)
    @Query("update Product p set " +
            "p.price = :price, p.imageURL = :imageURL, p.description = :description, p.soldQuantity = :soldQuantity " +
            "where p.productId = :productId")
    void updateProduct(@Param("productId") Long productId,
                       @Param("price") double price,
                       @Param("imageURL") String imageURL,
                       @Param("description") String description,
                       @Param("soldQuantity") int soldQuantity);

    @Modifying(clearAutomatically=true)
    @Query("update Product p set " +
            "p.price = :price " +
            "where p.productId = :productId")
    void updateProductPrice(@Param("productId") Long productId,
                            @Param("price") double price);

    @Modifying(clearAutomatically=true)
    @Query("update Product p set " +
            "p.soldQuantity = :soldQuantity " +
            "where p.productId = :productId")
    void updateProductSoldQuantity(@Param("productId") Long productId,
                                     @Param("soldQuantity") int soldQuantity);
}
