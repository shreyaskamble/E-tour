package com.etour.main.models;

import jakarta.persistence.*;

@Entity
@Table(name = "itinerary_master")
public class ItineraryMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "itr_id")
    private Integer itrId;

    @ManyToOne
    @JoinColumn(name = "catmaster_id", nullable = false)
    private CategoryMaster categoryMaster;
    
    @ManyToOne
    @JoinColumn(name = "sub_catmaster_id", nullable = false)
    private SubCategoryMaster subCategoryMaster;

    @Column(name = "day_no")
    private Integer dayNo;

    @Column(name = "itr_dtl", columnDefinition = "TEXT")
    private String itrDtl;

    // Getters and Setters

    public Integer getItrId() {
        return itrId;
    }

    public void setItrId(Integer itrId) {
        this.itrId = itrId;
    }

    public CategoryMaster getCategoryMaster() {
        return categoryMaster;
    }

    public void setCategoryMaster(CategoryMaster categoryMaster) {
        this.categoryMaster = categoryMaster;
    }
    public SubCategoryMaster getSubCategoryMaster() {
        return subCategoryMaster;
    }

    public void setSubCategoryMaster(SubCategoryMaster subCategoryMaster) {
        this.subCategoryMaster = subCategoryMaster;
    }

    public Integer getDayNo() {
        return dayNo;
    }

    public void setDayNo(Integer dayNo) {
        this.dayNo = dayNo;
    }

    public String getItrDtl() {
        return itrDtl;
    }

    public void setItrDtl(String itrDtl) {
        this.itrDtl = itrDtl;
    }
}
