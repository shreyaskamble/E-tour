package com.etour.main.models;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "date_master")
public class DateMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "departure_id")
    private Integer departureId;

    @ManyToOne
    @JoinColumn(name = "catmaster_id", nullable = false)
    private CategoryMaster categoryMaster;
    
    @ManyToOne
    @JoinColumn(name = "sub_cat_id", nullable = false)
    private SubCategoryMaster subCategoryMaster;

    @Column(name = "depart_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date departDate;

    @Column(name = "end_date")
    @Temporal(TemporalType.DATE)
    private Date endDate;

    @Column(name = "no_of_days")
    private Integer noOfDays;

    // Getters and Setters

    public Integer getDepartureId() {
        return departureId;
    }

    public void setDepartureId(Integer departureId) {
        this.departureId = departureId;
    }
    public SubCategoryMaster getSubCategoryMaster() {
        return subCategoryMaster;
    }

    public void setSubCategoryMaster(SubCategoryMaster subCategoryMaster) {
        this.subCategoryMaster = subCategoryMaster;
    }

    public CategoryMaster getCategoryMaster() {
        return categoryMaster;
    }

    public void setCategoryMaster(CategoryMaster categoryMaster) {
        this.categoryMaster = categoryMaster;
    }

    public Date getDepartDate() {
        return departDate;
    }

    public void setDepartDate(Date departDate) {
        this.departDate = departDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Integer getNoOfDays() {
        return noOfDays;
    }

    public void setNoOfDays(Integer noOfDays) {
        this.noOfDays = noOfDays;
    }
}
