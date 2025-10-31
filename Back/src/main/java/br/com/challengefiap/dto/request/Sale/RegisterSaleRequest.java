package br.com.challengefiap.dto.request.Sale;

public class RegisterSaleRequest {
    private long clientId;
    private long productId;
    private long quantity;

    public RegisterSaleRequest(){}
    public RegisterSaleRequest(long clientId, long productId, long quantity) {
        this.clientId = clientId;
        this.productId = productId;
        this.quantity = quantity;
    }
    
    public long getClientId() {return clientId;}
    public long getProductId() {return productId;}
    public long getQuantity() {return quantity;}

    public void setClientId(long clientId) {this.clientId = clientId;}
    public void setProductId(long productId) {this.productId = productId;}
    public void setQuantity(long quantity) {this.quantity = quantity;}
}
