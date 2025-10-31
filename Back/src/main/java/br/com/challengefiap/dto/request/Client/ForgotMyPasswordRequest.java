package br.com.challengefiap.dto.request.Client;

import br.com.challengefiap.model.ClientsRoles;

public class ForgotMyPasswordRequest {
    private long id;
    private String lastPassword;
    private String newPassword;

    public ForgotMyPasswordRequest() {}

    public ForgotMyPasswordRequest(long id,String lastPassword, String newPassword) {
        this.id = id;
        this.lastPassword = lastPassword;
        this.newPassword = newPassword;
    }

    public long getId(){return id;}
    public String getLastPassword(){return lastPassword;}
    public String getNewPassword(){return newPassword;}

    public void setId(long id){this.id = id;}
    public void setLastPassword(String lastPassword){this.lastPassword = lastPassword;}
    public void setNewPassword(String newPassword){this.newPassword = newPassword;}
}
