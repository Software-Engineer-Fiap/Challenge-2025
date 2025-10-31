package br.com.challengefiap.resource;

import br.com.challengefiap.dao.ProductDao;
import br.com.challengefiap.dto.request.Product.RegisterProductRequest;
import br.com.challengefiap.dto.response.Product.LongProductResponse;
import br.com.challengefiap.dto.response.Product.ShortProductResponse;
import br.com.challengefiap.model.Product;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.sql.SQLException;
import java.util.List;

@Path("product")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ProductResource {

    ProductDao productDao;

    public ProductResource() throws SQLException {
        this.productDao = new ProductDao();
    }

    @POST
    public Response CreateProductService(RegisterProductRequest product , @Context UriInfo uriInfo) throws Exception {
        ShortProductResponse response = productDao.RegisterProduct(product);
        UriBuilder builder = uriInfo.getAbsolutePathBuilder();
        builder.path(String.valueOf(response.getId()));

        return Response.created(builder.build()).entity(response).build();
    }

    @GET
    @Path("{id}")
    public Response GetProductByIdService(@PathParam("id") long id) throws Exception {
        LongProductResponse product = productDao.ReadProductById(id);
        return Response.ok(product).build();
    }
    
    @GET
    public Response GetAllProductsService() throws Exception {
        List<ShortProductResponse> productList = productDao.ReadAllProducts();
        return Response.ok(productList).build();
    }

    @PATCH
    public Response UpdateProductService(Product product) throws Exception {
        boolean success = productDao.UpdateProduct(product);
        return success?
                Response.noContent().build():
                Response.status(Response.Status.NOT_FOUND.getStatusCode(),
                        "Product not Found!").build();
    }

    @DELETE
    @Path("{id}")
    public Response DeleteProductService(@PathParam("id") long id) throws Exception {
        boolean wasDeleted = productDao.DeleteProductById(id);
        return wasDeleted?
                Response.noContent().build():
                Response.status(Response.Status.NOT_FOUND.getStatusCode(),
                        "Product not Found!").build();
    }
}
