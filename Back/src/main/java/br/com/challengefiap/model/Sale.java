package br.com.challengefiap.model;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Sale {
    private long saleId;
    private long clientId;
    private long productId;
    private long quantity;
    private double productPrice;
    
    public Sale(){}
    public Sale(long saleId, long clientId, long productId, double productPrice, long quantity) {
        this.saleId = saleId;
        this.clientId = clientId;
        this.productId = productId;
        this.quantity = quantity;
        this.productPrice = productPrice;
    }
    
    public long getSaleId() {return saleId;}
    public long getClientId() {return clientId;}
    public long getProductId() {return productId;}
    public long getQuantity() {return quantity;}
    public double getAmount() {
        return this.productPrice * this.quantity;
    }
    
    public void setSaleId(long saleId) {this.saleId = saleId;}
    public void setClientId(long clientId) {this.clientId = clientId;}
    public void setProductId(long productId) {this.productId = productId;}
    public void setProductPrice(double productPrice) {this.productPrice = productPrice;}
    public void setQuantity(long quantity) {this.quantity = quantity;}

    public static Sale FromResultSet(ResultSet result) throws SQLException {
        Sale sale = new Sale();
        sale.setSaleId(result.getLong("saleId"));
        sale.setClientId(result.getLong("clientId"));
        sale.setProductId(result.getLong("productId"));
        sale.setProductPrice(result.getDouble("productPrice"));
        sale.setQuantity(result.getLong("quantity"));
        return sale;
    }
}
