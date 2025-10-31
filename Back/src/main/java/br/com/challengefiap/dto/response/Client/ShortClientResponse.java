package br.com.challengefiap.dto.response.Client;

public class ShortClientResponse {
    private long id;
    private String name;

    public ShortClientResponse(){}

    public ShortClientResponse(long id, String name){
        this.id = id;
        this.name = name;
    }

    public long getId() {
        return id;
    }
    public String getName() {return name;}

    public void setId(long id) {this.id = id;}
    public void setName(String name) {this.name = name;}
}
