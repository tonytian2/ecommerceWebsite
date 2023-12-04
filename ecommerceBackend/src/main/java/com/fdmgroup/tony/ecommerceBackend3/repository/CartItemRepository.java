package com.fdmgroup.tony.ecommerceBackend3.repository;

import com.fdmgroup.tony.ecommerceBackend3.model.CartItem;
import com.fdmgroup.tony.ecommerceBackend3.model.Product;
import com.fdmgroup.tony.ecommerceBackend3.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByUser(User user);

    @Query("Select i from CartItem i WHERE i.user = :user AND i.cartItemId = :cartItemId")
    public Optional<CartItem> findByCartItemIdAndUser(Long cartItemId, User user);


    public void deleteByProduct(Product product);

    @Query("Select i from CartItem i WHERE i.user = :user AND i.product = :product")
    Optional<CartItem> findByUserAndProduct(User user, Product product);

    @Modifying(clearAutomatically=true)
    @Query("update CartItem i set " +
            "i.quantity = :quantity " +
            "where i.cartItemId = :cartItemId")
    void updateQuantity(@Param("cartItemId") Long cartItemId,
                                   @Param("quantity") int quantity);

    public void deleteByUser(User user);
}
