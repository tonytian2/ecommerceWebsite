package com.fdmgroup.tony.ecommerceBackend3.repository;

import com.fdmgroup.tony.ecommerceBackend3.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    //@Query("SELECT u from User u WHERE u.username = :username")
    Optional<User> findByUsername(String username);

    @Modifying(clearAutomatically=true)
    @Query("update User u set u.password = :newPassword where u.username = :username")
    void updatePassword(@Param("username") String username, @Param("newPassword") String password);
}
