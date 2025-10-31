package br.com.challengefiap.dto.request.Product;

public class RegisterProductRequest {
    private String name;
    private long barCode;
    private double price;

    public RegisterProductRequest() {}
    public RegisterProductRequest(String name, long barCode, double price) {
        this.name = name;
        this.barCode = barCode;
        this.price = price;
    }
    public void setName(String name) {this.name = name;}
    public void setBarCode(long barCode) {this.barCode = barCode;}
    public void setPrice(double price) {this.price = price;}

    public String getName() {return name;}
    public long getBarCode() {return barCode;}
    public double getPrice() {return price;}

}
