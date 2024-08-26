package com.etour.main.Dao;

import com.etour.main.models.Passenger;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PassengerRepository extends JpaRepository<Passenger, Integer> {
    // Additional query methods (if needed) can be defined here
	List<Passenger> findByBookingHeader_BookingId(Long bookingId);
}
