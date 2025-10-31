package br.com.challengefiap.dto.request.Client;

import br.com.challengefiap.model.ClientsRoles;

public class CreateClientRequest {
    private String name;
    private String email;
    private String password;
    private ClientsRoles role =  ClientsRoles.VAREJISTA;

    public CreateClientRequest() {}

    public CreateClientRequest(String name, String email, String password, ClientsRoles role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public String getName(){return name;}
    public String getEmail(){return email;}
    public String getPassword(){return password;}
    public ClientsRoles getRole(){return role;}

    public void setName(String name){this.name = name;}
    public void setEmail(String email){this.email = email;}
    public void setPassword(String password){this.password = password;}
    public void setRole(ClientsRoles role){this.role = role;}
}
