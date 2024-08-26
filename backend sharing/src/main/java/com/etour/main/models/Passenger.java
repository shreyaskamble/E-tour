package com.etour.main.models;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "passenger")
public class Passenger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pax_id")
    private int paxId;

    @ManyToOne
    @JoinColumn(name = "booking_id", referencedColumnName = "booking_id", nullable = true)
    private BookingHeader bookingHeader;

    @Column(name = "pax_name", nullable = true)
    private String paxName;

    @Column(name = "pax_birthdate")
    private Date paxBirthdate;

    @Column(name = "pax_type", nullable = true)
    private String paxType;

    @Column(name = "pax_amount")
    private BigDecimal paxAmount;

    // Getters and Setters

    public int getPaxId() {
        return paxId;
    }

    public void setPaxId(int paxId) {
        this.paxId = paxId;
    }

    public BookingHeader getBookingHeader() {
        return bookingHeader;
    }

    public void setBookingHeader(BookingHeader bookingHeader) {
        this.bookingHeader = bookingHeader;
    }

    public String getPaxName() {
        return paxName;
    }

    public void setPaxName(String paxName) {
        this.paxName = paxName;
    }

    public Date getPaxBirthdate() {
        return paxBirthdate;
    }

    public void setPaxBirthdate(Date paxBirthdate) {
        this.paxBirthdate = paxBirthdate;
    }

    public String getPaxType() {
        return paxType;
    }

    public void setPaxType(String paxType) {
        this.paxType = paxType;
    }

    public BigDecimal getPaxAmount() {
        return paxAmount;
    }

    public void setPaxAmount(BigDecimal paxAmount) {
        this.paxAmount = paxAmount;
    }
}
