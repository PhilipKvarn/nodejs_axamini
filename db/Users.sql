CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    telephone_number VARCHAR(20),
    email VARCHAR(255),
    role VARCHAR(100),
    company_name VARCHAR(255)
);