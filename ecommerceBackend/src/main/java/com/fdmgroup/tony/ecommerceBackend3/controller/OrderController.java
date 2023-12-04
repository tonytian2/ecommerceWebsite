package com.fdmgroup.tony.ecommerceBackend3.controller;

import com.fdmgroup.tony.ecommerceBackend3.model.Order;
import com.fdmgroup.tony.ecommerceBackend3.model.OrderProduct;
import com.fdmgroup.tony.ecommerceBackend3.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "api/v1/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;


    @GetMapping("/{username}")
    public ResponseEntity<List<Order>> getOrdersByUsername(@PathVariable("username") String username){

        return ResponseEntity.status(HttpStatus.OK).body(orderService.getOrdersByUsername(username));
    }


    @PostMapping("/")
    public ResponseEntity createOrder(@RequestBody Map<String, Object> payLoad){
        try {
            OrderProduct orderProduct = new OrderProduct(Long.parseLong((String) payLoad.get("productId")),
                    Long.parseLong((String) payLoad.get("snapshotTime")),
                    (String) payLoad.get("productName"),
                    (String) payLoad.get("price"),
                    (String) payLoad.get("imageURL"));
            int boughtQuantity = Integer.parseInt((String) payLoad.get("boughtQuantity"));
            String username = (String) payLoad.get("username");
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(orderService.createOrderProduct(orderProduct, boughtQuantity,username)
                    );
        }
        catch(ClassCastException | NullPointerException  e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Order contains invalid input: "+e.getMessage()
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


}
