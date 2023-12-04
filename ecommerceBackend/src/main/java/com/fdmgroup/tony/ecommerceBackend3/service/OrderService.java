package com.fdmgroup.tony.ecommerceBackend3.service;

import com.fdmgroup.tony.ecommerceBackend3.model.Order;
import com.fdmgroup.tony.ecommerceBackend3.model.OrderProduct;
import com.fdmgroup.tony.ecommerceBackend3.model.User;
import com.fdmgroup.tony.ecommerceBackend3.repository.OrderRepository;
import com.fdmgroup.tony.ecommerceBackend3.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    @Autowired
    public OrderService(UserRepository userRepository, OrderRepository orderRepository) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }

    public Order createOrderProduct(OrderProduct orderProduct, int boughtQuantity, String username) {

        Optional<User> userOptional =  userRepository.findByUsername(username);
        if(userOptional.isEmpty()){
            throw new IllegalStateException("User " + username + " not found.");
        }
        User user = userOptional.get();
        return orderRepository.save(new Order(orderProduct, user, boughtQuantity));

    }

    public List<Order> getOrdersByUsername(String username) {
        Optional<User> userOptional =  userRepository.findByUsername(username);
        if(userOptional.isEmpty()){
            throw new IllegalStateException("User " + username + " not found.");
        }
        User user = userOptional.get();
        return orderRepository.findByUser(user);
    }
}
