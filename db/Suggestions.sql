CREATE TABLE Suggestions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
	creator_id INT,
    FOREIGN KEY (creator_id) REFERENCES users(id),
	machine_id INT,
    FOREIGN KEY (machine_id) REFERENCES machines(id),
    description TEXT
);