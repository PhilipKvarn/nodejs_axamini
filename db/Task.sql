CREATE TABLE Task (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    next_execution_date DATE,
    interval_days INT,
    execution_time TIME,
    machine_id INT,
    description TEXT
);