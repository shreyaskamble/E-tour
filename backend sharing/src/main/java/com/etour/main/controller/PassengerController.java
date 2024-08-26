package com.etour.main.controller;

import com.etour.main.models.BookingHeader;
import com.etour.main.models.Passenger;
import com.etour.main.service.Category.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import javax.management.relation.RoleInfoNotFoundException;

@RestController
@RequestMapping("/api/passengers")
@CrossOrigin
public class PassengerController {

    private final PassengerService passengerService;

    @Autowired
    public PassengerController(PassengerService passengerService) {
        this.passengerService = passengerService;
    }

    // Get all passengers
    @GetMapping
    public ResponseEntity<List<Passenger>> getAllPassengers() {
        List<Passenger> passengers = passengerService.findAll();
        return ResponseEntity.ok(passengers);
    }

    // Get a specific passenger by ID
    @GetMapping("/{id}")
    public ResponseEntity<Passenger> getPassengerById(@PathVariable Integer id) {
        Optional<Passenger> passenger = passengerService.findById(id);
        return passenger.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<List<Passenger>> getPassengersByBookingId(@PathVariable Long bookingId) {
        List<Passenger> passengers = passengerService.getPassengersByBookingId(bookingId);
        return ResponseEntity.ok(passengers);
    }

    // Create a new passenger
   // @PostMapping
//    public ResponseEntity<Passenger> createPassenger(@RequestBody Passenger passenger) {
//        Passenger savedPassenger = passengerService.save(passenger);
//        return ResponseEntity.ok(savedPassenger);
//    }
    
//    @PostMapping
//    public ResponseEntity<?> addPassenger(@RequestBody Passenger passenger) {
//        try {
//            // Allow adding passengers without booking
//            
//            passengerService.save(passenger);
//            return ResponseEntity.ok().body(passenger);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
//        }
//    }
    
    @PostMapping
    public ResponseEntity<?> addPassengers(@RequestBody List<Passenger> passengers) {
        try {
            List<Passenger> savedPassengers = passengerService.saveAll(passengers);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPassengers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    
    

    // Update an existing passenger by ID
    @PutMapping("/{id}")
    public ResponseEntity<Passenger> updatePassenger(@PathVariable Integer id, @RequestBody Passenger passenger) {
        Passenger updatedPassenger = passengerService.updateById(id, passenger);
        return ResponseEntity.ok(updatedPassenger);
    }
//    @PutMapping("/{passengerId}/booking/{bookingId}")
//    public ResponseEntity<?> updatePassengerWithBooking(@PathVariable Long passengerId, @PathVariable Long bookingId) {
//        try {
//            passengerService.updatePassengerWithBooking(passengerId, bookingId);
//            return ResponseEntity.ok().body("Passenger updated with booking successfully.");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
//        }

    // Delete a passenger by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePassenger(@PathVariable Integer id) {
        passengerService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
