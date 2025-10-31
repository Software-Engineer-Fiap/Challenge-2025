package br.com.challengefiap.dto.response.Sale;

public class LongSaleResponse {
    private long saleId;
    private long clientId;
    private long productId;
    private long quantity;
    private double productPrice;
    private double amount;

    public LongSaleResponse(){}
    public LongSaleResponse(long id, long clientId, long productId, double productPrice, long quantity) {
        this.saleId = id;
        this.clientId = clientId;
        this.productId = productId;
        this.quantity = quantity;
        this.productPrice = productPrice;
    }

    public long getSaleId() {return saleId;}
    public long getClientId() {return clientId;}
    public long getProductId() {return productId;}
    public long getQuantity() {return quantity;}
    public double getProductPrice() {return productPrice;}
    public double getAmount() {return amount;}

    public void setId(long id) {this.saleId = id;}
    public void setClientId(long clientId) {this.clientId = clientId;}
    public void setProductId(long productId) {this.productId = productId;}
    public void setQuantity(long quantity) {this.quantity = quantity;}
    public void setProductPrice(double productPrice) {
        this.productPrice = productPrice;
        this.amount = this.productPrice * this.quantity;
    }
    public void setAmount() {
        this.amount = this.productPrice * this.quantity;
    }
}
