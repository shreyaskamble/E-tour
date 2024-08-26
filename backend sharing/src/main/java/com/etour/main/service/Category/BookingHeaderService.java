package com.etour.main.service.Category;

import com.etour.main.models.BookingHeader;

import java.util.List;
import java.util.Optional;

public interface BookingHeaderService {
    List<BookingHeader> findAll();
    Optional<BookingHeader> findById(Long id);
    BookingHeader save(BookingHeader bookingHeader);
    BookingHeader updateById(Long id, BookingHeader updatedBookingHeader);
    void deleteById(Long id);
	
	boolean existsById(Long id);
	BookingHeader saveBookingHeader(BookingHeader bookingHeader, Long customerId);
}
