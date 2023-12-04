package com.fdmgroup.tony.ecommerceBackend3.repository;

import com.fdmgroup.tony.ecommerceBackend3.model.CartItem;
import com.fdmgroup.tony.ecommerceBackend3.model.Order;
import com.fdmgroup.tony.ecommerceBackend3.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}
