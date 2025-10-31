package br.com.challengefiap.dao;

import br.com.challengefiap.dto.request.Sale.RegisterSaleRequest;
import br.com.challengefiap.dto.response.Sale.LongSaleResponse;
import br.com.challengefiap.dto.response.Sale.ShortSaleResponse;
import br.com.challengefiap.exception.EntityNotFoundException;
import br.com.challengefiap.factory.ConnectionFactory;
import br.com.challengefiap.model.Sale;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class SaleDao {
    private Connection connection;
    ModelMapper mapper = new ModelMapper();

    public SaleDao() throws SQLException {
        connection = ConnectionFactory.getConnection();
        mapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT);

    }


    public ShortSaleResponse RegisterSale(RegisterSaleRequest saleRequest) throws Exception{
        try {
            double price = getProductPrice(saleRequest.getProductId());
            if(price <= 0)
                throw new Exception("Error consulting product price");

            Sale sale = mapper.map(saleRequest, Sale.class);
            PreparedStatement preparedStatement = connection
                    .prepareStatement("INSERT INTO sale (clientId, productId, quantity,productPrice) VALUES (?,?,?,?)");

            preparedStatement.setLong(1, saleRequest.getClientId());
            preparedStatement.setLong(2, saleRequest.getProductId());
            preparedStatement.setLong(3, saleRequest.getQuantity());

            preparedStatement.setDouble(4, price);

            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows == 0) throw new SQLException("Error on sale insertion");

            ResultSet resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) sale.setSaleId(resultSet.getLong("id"));

            return mapper.map(sale, ShortSaleResponse.class);

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            CloseConnection();
        }
    }

    public void CloseConnection() throws SQLException {
        connection.close();
    }

    public List<ShortSaleResponse> ReadAllSales() throws Exception {
        try{
            PreparedStatement preparedStatement =
                    connection.prepareStatement("SELECT * FROM sale",
                    ResultSet.TYPE_SCROLL_INSENSITIVE,
                    ResultSet.CONCUR_READ_ONLY);
            ResultSet resultSet = preparedStatement.executeQuery();
            List<ShortSaleResponse> saleList = new ArrayList<>();

            while(resultSet.next()) {
                Sale sale = Sale.FromResultSet(resultSet);
                saleList.add(mapper.map(sale, ShortSaleResponse.class));
            }
            if(!saleList.isEmpty()) return saleList;
        }
        catch(Exception e) {
            throw new EntityNotFoundException(e.getMessage());
        } finally {
            CloseConnection();
        }
        return new ArrayList<>();
    }

    public LongSaleResponse ReadSaleById(long Id) throws Exception {
        try{
            PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM sale WHERE saleId = ?");
            preparedStatement.setLong(1, Id);
            ResultSet resultSet = preparedStatement.executeQuery();

            if(resultSet.next()) {
                Sale sale = Sale.FromResultSet(resultSet);
                return mapper.map(sale, LongSaleResponse.class);
            }
        }
        catch(Exception e) {
            throw new EntityNotFoundException(e.getMessage());
        } finally {
            CloseConnection();
        }
        throw new EntityNotFoundException("Sale with id " + Id + " not found");
    }

    public boolean DeleteSaleById(long Id) throws Exception {
        PreparedStatement preparedStatement =
                connection.prepareStatement("DELETE FROM sale WHERE saleId = ?");
        preparedStatement.setLong(1,Id);
        int affectedRows = preparedStatement.executeUpdate();
        return affectedRows != 0;
    }

    private double getProductPrice(long productId) throws Exception {
        PreparedStatement preparedStatement = connection
                .prepareStatement("SELECT price FROM product WHERE id = ?");
        preparedStatement.setLong(1, productId);
        ResultSet resultSet = preparedStatement.executeQuery();
        if(resultSet.next()){
            return resultSet.getDouble("price");
        }
        return -1;
    }
}
