package br.com.challengefiap.dto.response.Client;

import br.com.challengefiap.model.ClientsRoles;

public class ClientLogedResponse {
    private long id;
    private ClientsRoles role;

    public ClientLogedResponse() {}
    public ClientLogedResponse(ClientsRoles role, long id) {
        this.role = role;
        this.id = id;
    }

    public long getId() {return this.id;}
    public ClientsRoles getRole() {return this.role;}

    public void setId(long id) {this.id = id;}
    public void setRole(ClientsRoles role) {this.role = role;}
}
