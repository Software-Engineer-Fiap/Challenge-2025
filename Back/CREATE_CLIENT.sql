CREATE SEQUENCE seq_client
START WITH 1 
INCREMENT BY 1;

CREATE TABLE client (
  id long default seq_client.NEXTVAL primary key,
  name VARCHAR2(50) NOT NULL,
  email VARCHAR2(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  user_role VARCHAR(10) NOT NULL
);




