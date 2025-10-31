CREATE SEQUENCE seq_sale
START WITH 1 
INCREMENT BY 1;

CREATE TABLE sale (
  saleId INT DEFAULT seq_sale.NEXTVAL PRIMARY KEY,
  clientId INT NOT NULL,
  productId INT NOT NULL,
  quantity LONG NOT NULL,
  productPrice DOUBLE PRECISION NOT NULL,
  CONSTRAINT fk_sale_client
    FOREIGN KEY (clientId)
    REFERENCES client(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_sale_product
    FOREIGN KEY (productId)
    REFERENCES product(id)
    ON DELETE CASCADE
);
