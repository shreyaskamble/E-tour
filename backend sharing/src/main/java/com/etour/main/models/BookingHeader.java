package com.etour.main.models;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "booking_header")
public class BookingHeader {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Long bookingId;

    public BookingHeader() {
    	this.bookingDate = new Date();
	}

	@Column(name = "booking_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date bookingDate;

    @ManyToOne
    @JoinColumn(name = "cust_id", nullable = true)
    private CustomerMaster customerMaster;

//    @ManyToOne
//    @JoinColumn(name = "tour_id", nullable = false)
//    private TourMaster tourMaster;
//
//    @ManyToOne
//    @JoinColumn(name = "departure_id", nullable = false)
//    private DateMaster dateMaster;

    @Column(name = "no_of_pax", nullable = true)
    private Integer noOfPax;

    @Column(name = "tour_amount", nullable = true, precision = 10, scale = 2)
    private BigDecimal tourAmount;

    @Column(name = "taxes", precision = 10, scale = 2)
    private BigDecimal taxes;

    @Column(name = "total_amount", nullable = true, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    // Getters and Setters

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public Date getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(Date bookingDate) {
        this.bookingDate = bookingDate;
    }

    public CustomerMaster getCustomerMaster() {
        return customerMaster;
    }

    public void setCustomerMaster(CustomerMaster customerMaster) {
        this.customerMaster = customerMaster;
    }

//    public TourMaster getTourMaster() {
//        return tourMaster;
//    }
//
//    public void setTourMaster(TourMaster tourMaster) {
//        this.tourMaster = tourMaster;
//    }
//
//    public DateMaster getDateMaster() {
//        return dateMaster;
//    }
//
//    public void setDateMaster(DateMaster dateMaster) {
//        this.dateMaster = dateMaster;
//    }

    public Integer getNoOfPax() {
        return noOfPax;
    }

    public void setNoOfPax(Integer noOfPax) {
        this.noOfPax = noOfPax;
    }

    public BigDecimal getTourAmount() {
        return tourAmount;
    }

    public void setTourAmount(BigDecimal tourAmount) {
        this.tourAmount = tourAmount;
    }

    public BigDecimal getTaxes() {
        return taxes;
    }

    public void setTaxes(BigDecimal taxes) {
        this.taxes = taxes;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

	public Long getId() {
		// TODO Auto-generated method stub
		return null;
	}
}
