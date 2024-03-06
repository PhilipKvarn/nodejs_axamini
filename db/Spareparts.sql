CREATE TABLE SpareParts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    amount_in_storage INT,
    machine_id INT,
    FOREIGN KEY (machine_id) REFERENCES Machines(id)
);