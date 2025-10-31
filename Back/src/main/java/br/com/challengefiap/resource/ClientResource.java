package br.com.challengefiap.resource;

import br.com.challengefiap.dao.ClientDao;
import br.com.challengefiap.dto.request.Client.CreateClientRequest;
import br.com.challengefiap.dto.request.Client.LoginRequest;
import br.com.challengefiap.dto.request.Client.UpdateClientRequest;
import br.com.challengefiap.dto.response.Client.ClientLogedResponse;
import br.com.challengefiap.dto.response.Client.LongClientResponse;
import br.com.challengefiap.dto.response.Client.ShortClientResponse;
import br.com.challengefiap.model.Client;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.sql.SQLException;

@Path("client")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ClientResource {
    ClientDao clientDao;
    public ClientResource() throws SQLException {
        clientDao = new ClientDao();
    }

    @POST
    public Response CreateClientService(CreateClientRequest client , @Context UriInfo uriInfo) throws Exception {
        ShortClientResponse response = clientDao.CreateClient(client);
        UriBuilder builder = uriInfo.getAbsolutePathBuilder();
        builder.path(String.valueOf(response.getId()));

        return Response.created(builder.build()).entity(response).build();
    }

    @POST
    @Path("login")
    public Response LoginClientService(LoginRequest client, @Context UriInfo uriInfo) throws Exception {
        ClientLogedResponse response = clientDao.LoginClient(client);
        return response == null ?
                Response.status(Response.Status.UNAUTHORIZED).build() :
                Response.ok(response).build();

    }

    @GET
    @Path("{id}")
    public Response GetClientByIdService(@PathParam("id") long id) throws Exception {
        LongClientResponse client = clientDao.ReadClientById(id);
        return Response.ok(client).build();
    }

    @PATCH
    public Response UpdateClientService(Client client) throws Exception {
        boolean success = clientDao.UpdateClient(client);
        return success?
            Response.noContent().build():
            Response.status(Response.Status.NOT_FOUND.getStatusCode(),
            "Client not Found!").build();
    }

    @DELETE
    @Path("{id}")
    public Response DeleteClientService(@PathParam("id") long id) throws Exception {
        boolean wasDeleted = clientDao.DeleteClientById(id);
        return wasDeleted?
                Response.noContent().build():
                Response.status(Response.Status.NOT_FOUND.getStatusCode(),
                "Client not Found!").build();
    }
}
