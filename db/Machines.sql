CREATE TABLE Machines (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    status VARCHAR(50),
    urgency VARCHAR(50),
    mechanic_id INT,
    FOREIGN KEY (mechanic_id) REFERENCES Users(id)
);