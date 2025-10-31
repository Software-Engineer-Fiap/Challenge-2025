package br.com.challengefiap.dao;

import br.com.challengefiap.dto.request.Client.CreateClientRequest;
import br.com.challengefiap.dto.request.Client.LoginRequest;
import br.com.challengefiap.dto.response.Client.ClientLogedResponse;
import br.com.challengefiap.dto.response.Client.LongClientResponse;
import br.com.challengefiap.dto.response.Client.ShortClientResponse;
import br.com.challengefiap.exception.EntityNotFoundException;
import br.com.challengefiap.factory.ConnectionFactory;
import br.com.challengefiap.model.Client;
import br.com.challengefiap.model.ClientsRoles;
import br.com.challengefiap.utils.PatchQueryMethodBuilder;
import org.modelmapper.ModelMapper;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ClientDao{
    private Connection connection;
    ModelMapper mapper = new ModelMapper();

    public ClientDao() throws SQLException {
        connection = ConnectionFactory.getConnection();
    }

    public ShortClientResponse CreateClient(CreateClientRequest clientRequest) throws Exception{
        try {
            Client client = mapper.map(clientRequest, Client.class);
            PreparedStatement preparedStatement = connection
                .prepareStatement("INSERT INTO CLIENT (NAME, EMAIL, PASSWORD, USER_ROLE) VALUES (?,?,?,?)");

            preparedStatement.setString(1, client.getName());
            preparedStatement.setString(2, client.getEmail());
            preparedStatement.setString(3, client.getPassword());
            preparedStatement.setString(4, client.getRole().name());

            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows == 0) throw new SQLException("Error on client insertion");

            ResultSet resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) client.setId(resultSet.getLong("id"));

            return mapper.map(client, ShortClientResponse.class);

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            CloseConnection();
        }
    }

    public void CloseConnection() throws SQLException {
        connection.close();
    }

    public LongClientResponse ReadClientById(long Id) throws Exception {
        try{
            PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM client WHERE id = ?");
            preparedStatement.setLong(1, Id);
            ResultSet resultSet = preparedStatement.executeQuery();

            if(resultSet.next()) {
                Client client = Client.FromResultSet(resultSet);
                return mapper.map(client, LongClientResponse.class);
            }
        }
        catch(Exception e) {
            throw new EntityNotFoundException(e.getMessage());
        } finally {
            CloseConnection();
        }
        throw new EntityNotFoundException("Client with id " + Id + " not found");
    }

    public boolean UpdateClient(Client client) throws Exception {
        try{
            PreparedStatement preparedStatement = new PatchQueryMethodBuilder.Builder()
                .setTable("client")
                .setField("name",client.getName())
                .setField("email",client.getEmail())
                .setField("user_role",
                        client.getRole() != null?
                        client.getRole().name():null
                )
                .setWhere("id",client.getId())
                .build()
                .preparedStatement;

            int affectedRows = preparedStatement.executeUpdate();
            return affectedRows > 0;
        }catch(Exception e) {
            throw new Exception(e.getMessage());
        }finally {
            this.CloseConnection();
        }
    }

    public boolean DeleteClientById(long Id) throws Exception {
        PreparedStatement preparedStatement =
                connection.prepareStatement("DELETE FROM client WHERE id = ?");
        preparedStatement.setLong(1,Id);
        int affectedRows = preparedStatement.executeUpdate();
        return affectedRows != 0;
    }

    public ClientLogedResponse LoginClient(LoginRequest loginRequest) throws Exception {
        try{
            Client client = this.ReadClientByEmail(loginRequest.getEmail());
            if(client == null) return null;
            return client.getPassword().equals(loginRequest.getPassword())?
                    mapper.map(client, ClientLogedResponse.class):
                    null;
        }catch(Exception e){
            throw new Exception(e.getMessage());
        }finally {
            this.CloseConnection();
        }
    }

    public Client ReadClientByEmail(String email) throws Exception {
        try{
            PreparedStatement preparedStatement = connection
                    .prepareStatement("SELECT * FROM client WHERE email = ?");
            preparedStatement.setString(1, email);
            ResultSet resultSet = preparedStatement.executeQuery();
            if(resultSet.next()){
                return Client.FromResultSet(resultSet);
            }
            return null;
        }catch(Exception e){
            throw new Exception(e.getMessage());
        }finally {
            this.CloseConnection();
        }
    }
}
