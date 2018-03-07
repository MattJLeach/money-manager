module.exports = {
    "up": `CREATE TABLE users
    (
        id int AUTO_INCREMENT, 
        name VARCHAR(255) NOT NULL, 
        email VARCHAR(255) NOT NULL, 
        password VARCHAR(255) NOT NULL, 
        created_at TIMESTAMP, 
        PRIMARY KEY(id)
    )`,
    "down": "DROP TABLE users"
}