package br.com.challengefiap.dto.response.Sale;

public class ShortSaleResponse {
    private long saleId;
    private long quantity;
    private double productPrice;
    private double amount;

    public ShortSaleResponse(){}
    public ShortSaleResponse(long saleId, double productPrice, long quantity) {
        this.saleId = saleId;
        this.quantity = quantity;
        this.productPrice = productPrice;
    }

    public long getSaleId() {return saleId;}
    public long getQuantity() {return quantity;}
    public double getProductPrice() {return productPrice;}
    public double getAmount() {return amount;}

    public void setSaleId(long saleId) {this.saleId = saleId;}
    public void setQuantity(long quantity) {this.quantity = quantity;}
    public void setProductPrice(double productPrice) {
        this.productPrice = productPrice;
        this.amount = this.productPrice * this.quantity;
    }
    public void setAmount() {
        this.amount = this.productPrice * this.quantity;
    }
}
