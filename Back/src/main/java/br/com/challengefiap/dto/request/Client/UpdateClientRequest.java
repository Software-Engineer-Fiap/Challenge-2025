package br.com.challengefiap.dto.request.Client;

import br.com.challengefiap.model.ClientsRoles;

public class UpdateClientRequest {
    private long id;
    private String name = null;
    private String email  = null;
    private ClientsRoles role = null;

    public UpdateClientRequest() {}

    public UpdateClientRequest(long id,String name, String email, ClientsRoles role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public long getId(){return id;}
    public String getName(){return name;}
    public String getEmail(){return email;}
    public ClientsRoles getRole(){return role;}

    public void setId(long id){this.id = id;}
    public void setName(String name){this.name = name;}
    public void setEmail(String email){this.email = email;}
    public void setRole(ClientsRoles role){this.role = role;}
}
