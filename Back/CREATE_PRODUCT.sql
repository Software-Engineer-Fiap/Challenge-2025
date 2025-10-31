CREATE SEQUENCE seq_product
START WITH 1 
INCREMENT BY 1;

CREATE TABLE product (
  id int default seq_product.NEXTVAL primary key,
  name VARCHAR2(50) NOT NULL,
  barCode long,
  price double precision NOT NULL
);