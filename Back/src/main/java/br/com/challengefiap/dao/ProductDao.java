package br.com.challengefiap.dao;

import br.com.challengefiap.dto.request.Product.RegisterProductRequest;
import br.com.challengefiap.dto.response.Product.LongProductResponse;
import br.com.challengefiap.dto.response.Product.ShortProductResponse;
import br.com.challengefiap.exception.EntityNotFoundException;
import br.com.challengefiap.factory.ConnectionFactory;
import br.com.challengefiap.model.Product;
import br.com.challengefiap.utils.PatchQueryMethodBuilder;
import org.modelmapper.ModelMapper;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ProductDao {
    private Connection connection;
    ModelMapper mapper = new ModelMapper();

    public ProductDao() throws SQLException {
        connection = ConnectionFactory.getConnection();
    }


    public ShortProductResponse RegisterProduct(RegisterProductRequest productRequest) throws Exception{
        try {
            Product product = mapper.map(productRequest, Product.class);
            PreparedStatement preparedStatement = connection
                    .prepareStatement("INSERT INTO PRODUCT (NAME, BARCODE, PRICE) VALUES (?,?,?)");

            preparedStatement.setString(1, product.getName());
            preparedStatement.setLong(2, product.getBarCode());
            preparedStatement.setDouble(3, product.getPrice());

            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows == 0) throw new SQLException("Error on product insertion");

            ResultSet resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) product.setId(resultSet.getLong("id"));

            return mapper.map(product, ShortProductResponse.class);

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            CloseConnection();
        }
    }

    public void CloseConnection() throws SQLException {
        connection.close();
    }

    public List<ShortProductResponse> ReadAllProducts() throws Exception {
        try{
            PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM product");
            ResultSet resultSet = preparedStatement.executeQuery();
            List<ShortProductResponse> productList = new ArrayList<>();

            while(resultSet.next()) {
                Product product = Product.FromResultSet(resultSet);
                productList.add(mapper.map(product, ShortProductResponse.class));
            }
            if(!productList.isEmpty()) return productList;
        }
        catch(Exception e) {
            throw new EntityNotFoundException(e.getMessage());
        } finally {
            CloseConnection();
        }
        return new ArrayList<>();
    }

    public LongProductResponse ReadProductById(long Id) throws Exception {
        try{
            PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM product WHERE id = ?");
            preparedStatement.setLong(1, Id);
            ResultSet resultSet = preparedStatement.executeQuery();

            if(resultSet.next()) {
                Product product = Product.FromResultSet(resultSet);
                return mapper.map(product, LongProductResponse.class);
            }
        }
        catch(Exception e) {
            throw new EntityNotFoundException(e.getMessage());
        } finally {
            CloseConnection();
        }
        throw new EntityNotFoundException("Product with id " + Id + " not found");
    }

    public boolean UpdateProduct(Product product) throws Exception {
        try{
            PreparedStatement preparedStatement = new PatchQueryMethodBuilder.Builder()
                    .setTable("product")
                    .setField("name",product.getName())
                    .setNumberField_NonZero("barCode",product.getBarCode())
                    .setNumberField_NonZero("price",product.getPrice())
                    .setWhere("id",product.getId())
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

    public boolean DeleteProductById(long Id) throws Exception {
        PreparedStatement preparedStatement =
                connection.prepareStatement("DELETE FROM product WHERE id = ?");
        preparedStatement.setLong(1,Id);
        int affectedRows = preparedStatement.executeUpdate();
        return affectedRows != 0;
    }

    public Product ReadProductByBarCode(String barCode) throws Exception {
        try{
            PreparedStatement preparedStatement = connection
                    .prepareStatement("SELECT * FROM product WHERE barCode = ?");
            preparedStatement.setString(1, barCode);
            ResultSet resultSet = preparedStatement.executeQuery();
            if(resultSet.next()){
                return Product.FromResultSet(resultSet);
            }
            return null;
        }catch(Exception e){
            throw new Exception(e.getMessage());
        }finally {
            this.CloseConnection();
        }
    }
}
