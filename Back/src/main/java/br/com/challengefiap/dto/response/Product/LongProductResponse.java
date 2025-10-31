package br.com.challengefiap.dto.response.Product;

public class LongProductResponse {
    private long id;
    private String name;
    private long barCode;
    private double price;

    public LongProductResponse() {}
    public LongProductResponse(long id, String name, long barCode, double price) {
        this.id = id;
        this.name = name;
        this.barCode = barCode;
        this.price = price;
    }

    public void setId(long id){
        this.id = id;
    }
    public void setBarCode(long barCode) {
        this.barCode = barCode;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setPrice(double price) {
        this.price = price;
    }

    public long getId() {return id;}
    public long getBarCode() {return barCode;}
    public String getName() {return name;}
    public double getPrice() {return price;}
}
