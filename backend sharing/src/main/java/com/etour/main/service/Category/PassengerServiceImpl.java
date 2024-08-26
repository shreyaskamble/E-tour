package com.etour.main.service.Category;

import com.etour.main.Dao.BookingHeaderRepository;
import com.etour.main.Dao.PassengerRepository;
import com.etour.main.models.BookingHeader;
import com.etour.main.models.Passenger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import javax.management.relation.RelationNotFoundException;

@Service
public class PassengerServiceImpl implements PassengerService {
	@Autowired
    private final PassengerRepository passengerRepository;
    
    @Autowired
    private BookingHeaderRepository bookingHeaderRepository;

    @Autowired
    public PassengerServiceImpl(PassengerRepository passengerRepository) {
        this.passengerRepository = passengerRepository;
    }

    @Override
    public List<Passenger> findAll() {
        return passengerRepository.findAll();
    }

    @Override
    public Optional<Passenger> findById(Integer id) {
        return passengerRepository.findById(id);
    }

    @Override
    public Passenger save(Passenger passenger) {
        return passengerRepository.save(passenger);
    }

    @Override
    public Passenger updateById(Integer id, Passenger updatedPassenger) {
        if (passengerRepository.existsById(id)) {
            updatedPassenger.setPaxId(id);
            return passengerRepository.save(updatedPassenger);
        } else {
            throw new RuntimeException("Passenger not found with id: " + id);
        }
    }

    @Override
    public void deleteById(Integer id) {
        if (passengerRepository.existsById(id)) {
            passengerRepository.deleteById(id);
        } else {
            throw new RuntimeException("Passenger not found with id: " + id);
        }
    }
    @Override
    public List<Passenger> saveAll(List<Passenger> passengers) {
        return passengerRepository.saveAll(passengers);
    }
    
    
    public List<Passenger> getPassengersByBookingId(Long bookingId) {
        return passengerRepository.findByBookingHeader_BookingId(bookingId);}

//	@Override
//	public void updatePassengerWithBooking(Integer passengerId, Integer bookingId) {
//		Passenger passenger = passengerRepository.findById(passengerId)
//      .orElseThrow(() -> new RelationNotFoundException("Passenger not found"));
//BookingHeader bookingHeader = bookingHeaderRepository.findById(bookingId);
//if (bookingHeaderOpt.isPresent()) {
//    BookingHeader bookingHeader = bookingHeaderOpt.get();
//    passenger.setBookingHeader(bookingHeader);
//} else {
//    // Handle the case when BookingHeader is not found
//    // For example, you could log a message or set the bookingHeader to null
//    // passenger.setBookingHeader(null); // Uncomment this line if you want to set it to null
//    System.out.println("BookingHeader not found for ID: " + bookingId);
//}
//		
//	}
    


	
//	public void updatePassengerWithBooking(Integer passengerId, Integer bookingId) {
//		Passenger passenger = passengerRepository.findById(passengerId)
//              .orElseThrow(() -> new RelationNotFoundException("Passenger not found"));
//      BookingHeader bookingHeader = bookingHeaderRepository.findById(bookingId)
//              .orElseThrow(() -> new ResourceNotFoundException("BookingHeader not found"));
//      passenger.setBookingHeader(bookingHeader);
//      passengerRepository.save(passenger);
//		
//	}
}
