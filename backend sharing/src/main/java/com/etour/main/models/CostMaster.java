package com.etour.main.models;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "cost_master")
public class CostMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cost_id")
    private Long costId;

    @ManyToOne
    @JoinColumn(name = "catmaster_id", nullable = false)
    private CategoryMaster categoryMaster;

    @Column(name = "cost", precision = 10, scale = 2)
    private BigDecimal cost;

    @Column(name = "single_prsn_cost", precision = 10, scale = 2)
    private BigDecimal singlePrsnCost;

    @Column(name = "extra_prsn_cost", precision = 10, scale = 2)
    private BigDecimal extraPrsnCost;

    @Column(name = "child_with_bed", precision = 10, scale = 2)
    private BigDecimal childWithBed;

    @Column(name = "child_without_bed", precision = 10, scale = 2)
    private BigDecimal childWithoutBed;

    @Column(name = "valid_from")
    @Temporal(TemporalType.DATE)
    private Date validFrom;

    @Column(name = "valid_to")
    @Temporal(TemporalType.DATE)
    private Date validTo;
    

    
    public SubCategoryMaster getSubCategoryMaster() {
		return subCategoryMaster;
	}

	public void setSubCategoryMaster(SubCategoryMaster subCategoryMaster) {
		this.subCategoryMaster = subCategoryMaster;
	}

	@ManyToOne
    @JoinColumn(name = "sub_category_id")
    private SubCategoryMaster subCategoryMaster;

    // Getters and Setters

    public Long getCostId() {
        return costId;
    }

    public void setCostId(Long costId) {
        this.costId = costId;
    }

    public CategoryMaster getCategoryMaster() {
        return categoryMaster;
    }

    public void setCategoryMaster(CategoryMaster categoryMaster) {
        this.categoryMaster = categoryMaster;
    }

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    public BigDecimal getSinglePrsnCost() {
        return singlePrsnCost;
    }

    public void setSinglePrsnCost(BigDecimal singlePrsnCost) {
        this.singlePrsnCost = singlePrsnCost;
    }

    public BigDecimal getExtraPrsnCost() {
        return extraPrsnCost;
    }

    public void setExtraPrsnCost(BigDecimal extraPrsnCost) {
        this.extraPrsnCost = extraPrsnCost;
    }

    public BigDecimal getChildWithBed() {
        return childWithBed;
    }

    public void setChildWithBed(BigDecimal childWithBed) {
        this.childWithBed = childWithBed;
    }

    public BigDecimal getChildWithoutBed() {
        return childWithoutBed;
    }

    public void setChildWithoutBed(BigDecimal childWithoutBed) {
        this.childWithoutBed = childWithoutBed;
    }

    public Date getValidFrom() {
        return validFrom;
    }

    public void setValidFrom(Date validFrom) {
        this.validFrom = validFrom;
    }

    public Date getValidTo() {
        return validTo;
    }

    public void setValidTo(Date validTo) {
        this.validTo = validTo;
    }
}
