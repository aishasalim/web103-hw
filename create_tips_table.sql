CREATE TABLE tips (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    category VARCHAR(100),
    image VARCHAR(255),
    submitted_by VARCHAR(100)
);
