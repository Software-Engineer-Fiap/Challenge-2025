package br.com.challengefiap.utils;

import br.com.challengefiap.factory.ConnectionFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

public class PatchQueryMethodBuilder {
    public PreparedStatement preparedStatement;

    private PatchQueryMethodBuilder(Builder builder) throws Exception {
        Connection connection = ConnectionFactory.getConnection();
        this.preparedStatement = connection.prepareStatement(builder.query.toString());

        for (int i = 0;i < builder.paramValues.size(); i++){
            int paramIndex = i +1;
            Object value = builder.paramValues.get(i);
            this.preparedStatement.setObject(paramIndex,value);
        }
    }

    public static class Builder{
        private StringBuilder query;
        private final List<Object> paramValues =  new ArrayList<>();

        public Builder setTable(String tableName){
            if(tableName.isBlank()) throw new IllegalArgumentException("Table name is null or blank");

            String format = String.format("UPDATE %s SET", tableName);
            this.query = new StringBuilder(format);
            return this;
        }

        public Builder setField(String fieldName,  Object value){
        //setField Accept Zero. If you don't want to, use setNumberField_NonZero
            if(value == null || value.toString().isEmpty()) return this;

            if(fieldName.isBlank()) throw new IllegalArgumentException("Field name is null or blank");
            this.query.append(String.format("%s %s = ?",
                paramValues.isEmpty() ? "":",",
                fieldName));
            this.paramValues.add(value);
            return this;
        }

        public Builder setNumberField_NonZero(String fieldName,  Number value){
            if(value == null || value.doubleValue() == 0.0) return this;
            setField(fieldName,value);
            return this;
        }

        public Builder setWhere(String fieldName, Object value){
            if(fieldName.isBlank() || value.toString().isBlank()
            ) throw new IllegalArgumentException("WHERE can't be null or blank");
            this.query.append(
                this.query.toString().contains("WHERE")?
                String.format(" AND %s = ?", fieldName):
                String.format(" WHERE %s = ?", fieldName)
            );
            this.paramValues.add(value);
            return this;
        }

        public PatchQueryMethodBuilder build() throws Exception{
            return new PatchQueryMethodBuilder(this);
        }
    }
}
