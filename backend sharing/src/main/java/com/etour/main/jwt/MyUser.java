package com.etour.main.jwt;

public class MyUser 
{
	private String username,password;



	private MyUser(String username, String password) {
		this.username = username;
		this.password = password;
		System.out.println("MyUser parameterized constructor");
	}


	public void setUsername(String username) {
		this.username = username;
		System.out.println("MyUser set username method");
	}

	public void setPassword(String password) {
		this.password = password;
		System.out.println("MyUser set password method");
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}
}
