package com.etour.main.controller;

import com.etour.main.models.BookingHeader;
import com.etour.main.service.Category.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/booking")
public class BookingHeaderController {

    private final BookingHeaderService bookingHeaderService;

    @Autowired
    public BookingHeaderController(BookingHeaderService bookingHeaderService) {
        this.bookingHeaderService = bookingHeaderService;
    }

    // Get all booking headers
    @GetMapping
    public ResponseEntity<List<BookingHeader>> getAllBookingHeaders() {
        List<BookingHeader> bookingHeaders = bookingHeaderService.findAll();
        return ResponseEntity.ok(bookingHeaders);
    }

    // Get a specific booking header by ID
    @GetMapping("/{id}")
    public ResponseEntity<BookingHeader> getBookingHeaderById(@PathVariable Long id) {
        Optional<BookingHeader> bookingHeader = bookingHeaderService.findById(id);
        return bookingHeader.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new booking header
    @PostMapping
    public ResponseEntity<BookingHeader> createBookingHeader(@RequestBody BookingHeader bookingHeader) {
        BookingHeader savedBookingHeader = bookingHeaderService.save(bookingHeader);
        return ResponseEntity.ok(savedBookingHeader);
    }

//    // Update an existing booking header by ID
//    @PutMapping("/{id}")
//    public ResponseEntity<BookingHeader> updateBookingHeader(@PathVariable Long id, @RequestBody BookingHeader bookingHeader) {
//        // Check if the booking exists
//        if (bookingHeaderService .existsById(id)) {
//            return ResponseEntity.notFound().build();
//        }
//
//        // Perform the update
//        BookingHeader updatedBookingHeader = bookingHeaderService.updateById(id, bookingHeader);
//        return ResponseEntity.ok(updatedBookingHeader);
//    }
    
    
    @PutMapping("/{id}")
    public ResponseEntity<BookingHeader> updateBookingHeader(@PathVariable Long id, @RequestBody BookingHeader bookingHeader) {
        // Check if the booking does not exist
        if (!bookingHeaderService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        // Perform the update
        BookingHeader updatedBookingHeader = bookingHeaderService.updateById(id, bookingHeader);
        return ResponseEntity.ok(updatedBookingHeader);
    }


    // Delete a booking header by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBookingHeader(@PathVariable Long id) {
        bookingHeaderService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
