package com.etour.main.models;

import jakarta.persistence.*;

@Entity
@Table(name = "customer_master")
public class CustomerMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cust_id")
    private Integer custId;

    @Column(name = "cust_name", nullable = false, length = 255)
    private String custName;

    @Column(name = "cust_details", columnDefinition = "TEXT")
    private String custDetails;

    @Column(name = "username", length = 20 ,unique=true)
    private String userName;

    @Column(name = "password", length = 20)
    private String passWord;

    @Column(name = "mobile_no")
    private Long mobileNo;
    
    @Column(name = "age")
    private String age;
    
    @Column(name = "gender")
    private String gender;
    
    @Column(name = "adhar_no")
    private Long adharNo;
    
    
    @Column(name = "address",columnDefinition = "TEXT")
    private String address;
    
    @Column(name = "email",columnDefinition = "TEXT")
    private String email;
    
    public String getConteryCode() {
		return conteryCode;
	}

	public void setConteryCode(String conteryCode) {
		this.conteryCode = conteryCode;
	}

	@Column(name = "contery_code",columnDefinition = "TEXT")
    private String conteryCode;
    
    
    

    // Getters and Setters

    public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassWord() {
		return passWord;
	}

	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Long getAdharNo() {
		return adharNo;
	}

	public void setAdharNo(Long adharNo) {
		this.adharNo = adharNo;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Integer getCustId() {
        return custId;
    }

    public void setCustId(Integer custId) {
        this.custId = custId;
    }

    public String getCustName() {
        return custName;
    }

    public void setCustName(String custName) {
        this.custName = custName;
    }

    public String getCustDetails() {
        return custDetails;
    }

    public void setCustDetails(String custDetails) {
        this.custDetails = custDetails;
    }

    public String getUsername() {
        return userName;
    }

    public void setUsername(String username) {
        this.userName = username;
    }

    public String getPassword() {
        return passWord;
    }

    public void setPassword(String password) {
        this.passWord = password;
    }

    public Long getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(Long mobileNo) {
        this.mobileNo = mobileNo;
    }
}
