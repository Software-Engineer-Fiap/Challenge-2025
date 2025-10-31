package br.com.challengefiap.model;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Product {
    private long id;
    private String name;
    private long barCode;
    private double price;

    public Product() {}
    public Product(long id, String name, long barCode, double price) {
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

    public static Product FromResultSet(ResultSet result) throws SQLException {
        Product product = new Product();
        product.setId(result.getLong("id"));
        product.setName(result.getString("name"));
        product.setBarCode(result.getLong("barCode"));
        product.setPrice(result.getDouble("price"));
        return product;
    }
}
