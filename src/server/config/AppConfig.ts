class Config {
    port = 8081;
    db = new DBConfig();

}

class DBConfig {
    database = 'mythikas';
    username = 'postgres';
    password = 'postgres';
    host = 'localhost';
    dialect = 'postgres';
}

export default new Config();