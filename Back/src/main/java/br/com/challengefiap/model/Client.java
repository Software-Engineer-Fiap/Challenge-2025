package br.com.challengefiap.model;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Client {
    private long id;
    private String name;
    private String email;
    private String password;
    private ClientsRoles role;

    public Client() {}

    public Client(String name, String email, String password, ClientsRoles role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public long getId() {return id;}
    public String getName(){return name;}
    public String getEmail(){return email;}
    public String getPassword(){return password;}
    public ClientsRoles getRole(){return role;}

    public void setId(long id){this.id = id;}
    public void setName(String name){this.name = name;}
    public void setEmail(String email){this.email = email;}
    public void setPassword(String password){this.password = password;}
    public void setRole(ClientsRoles role){this.role = role;}

    public static Client FromResultSet(ResultSet result) throws SQLException{
        Client client = new Client();
        client.setId(result.getLong("id"));
        client.setName(result.getString("name"));
        client.setEmail(result.getString("email"));
        client.setPassword(result.getString("password"));
        client.setRole(ClientsRoles.valueOf(result.getString("user_role")));
        return client;
    }
}
