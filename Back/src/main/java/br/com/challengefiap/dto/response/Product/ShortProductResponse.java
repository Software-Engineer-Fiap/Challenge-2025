package br.com.challengefiap.dto.response.Product;

public class ShortProductResponse {
    private String name;
    private long id;
    private double price;

    public ShortProductResponse() {}
    public ShortProductResponse(String name, long id, double price) {
        this.name = name;
        this.id = id;
        this.price = price;
    }
    public void setName(String name) {this.name = name;}
    public void setId(long id) {this.id = id;}
    public void setPrice(double price) {this.price = price;}

    public String getName() {return name;}
    public long getId() {return id;}
    public double getPrice() {return price;}
}
