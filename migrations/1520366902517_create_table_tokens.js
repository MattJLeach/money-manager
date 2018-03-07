module.exports = {
    "up": `CREATE TABLE tokens
    (
        id int AUTO_INCREMENT, 
        user_id int, 
        token VARCHAR(255) NOT NULL,
        expired Bool,
        created_at TIMESTAMP,
        PRIMARY KEY(id)
    )`,
    "down": "DROP TABLE tokens"
}