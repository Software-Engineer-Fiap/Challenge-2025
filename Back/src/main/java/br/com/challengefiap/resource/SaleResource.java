package br.com.challengefiap.resource;

import br.com.challengefiap.dao.SaleDao;
import br.com.challengefiap.dto.request.Sale.RegisterSaleRequest;
import br.com.challengefiap.dto.response.Sale.LongSaleResponse;
import br.com.challengefiap.dto.response.Sale.ShortSaleResponse;
import br.com.challengefiap.model.Sale;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriBuilder;
import jakarta.ws.rs.core.UriInfo;

import java.sql.SQLException;
import java.util.List;

@Path("sale")
public class SaleResource {
    SaleDao saleDao;

    public SaleResource() throws SQLException {
        this.saleDao = new SaleDao();
    }

    @POST
    public Response CreateSaleService(RegisterSaleRequest sale , @Context UriInfo uriInfo) throws Exception {
        ShortSaleResponse response = saleDao.RegisterSale(sale);
        UriBuilder builder = uriInfo.getAbsolutePathBuilder();
        builder.path(String.valueOf(response.getSaleId()));

        return Response.created(builder.build()).entity(response).build();
    }

    @GET
    @Path("{id}")
    public Response GetSaleByIdService(@PathParam("id") long id) throws Exception {
        LongSaleResponse sale = saleDao.ReadSaleById(id);
        return Response.ok(sale).build();
    }

    @GET
    public Response GetAllSalesService() throws Exception {
        List<ShortSaleResponse> saleList = saleDao.ReadAllSales();
        return Response.ok(saleList).build();
    }

    @DELETE
    @Path("{id}")
    public Response DeleteSaleService(@PathParam("id") long id) throws Exception {
        boolean wasDeleted = saleDao.DeleteSaleById(id);
        return wasDeleted?
                Response.noContent().build():
                Response.status(Response.Status.NOT_FOUND.getStatusCode(),
                        "Sale not Found!").build();
    }
}
