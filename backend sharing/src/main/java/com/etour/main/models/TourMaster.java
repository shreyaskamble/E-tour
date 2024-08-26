package com.etour.main.models;

import jakarta.persistence.*;

@Entity
@Table(name = "TourMaster")
public class TourMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Tour_id")
    private int tourId;

    @ManyToOne
    @JoinColumn(name = "Catmaster_id", referencedColumnName = "Catmaster_id", nullable = false)
    private CategoryMaster categoryMaster;

    @ManyToOne
    @JoinColumn(name = "Departure_id", referencedColumnName = "Departure_Id", nullable = false)
    private DateMaster dateMaster;

    // Getters and Setters

    public int getTourId() {
        return tourId;
    }

    public void setTourId(int tourId) {
        this.tourId = tourId;
    }

    public CategoryMaster getCategoryMaster() {
        return categoryMaster;
    }

    public void setCategoryMaster(CategoryMaster categoryMaster) {
        this.categoryMaster = categoryMaster;
    }

    public DateMaster getDateMaster() {
        return dateMaster;
    }

    public void setDateMaster(DateMaster dateMaster) {
        this.dateMaster = dateMaster;
    }
}
