package com.etour.main.Dao;

import com.etour.main.models.BookingHeader;
import com.etour.main.models.Passenger;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingHeaderRepository extends JpaRepository<BookingHeader, Long> {

	Optional<Passenger> findById(Integer bookingId);
}
