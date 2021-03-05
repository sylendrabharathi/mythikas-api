class Config {
    port = 8081;
    db = new DBConfig();

}

class DBConfig {
    database = 'brain_beat';
    username = 'postgres';
    password = 'postgres';
    host = 'localhost';
    dialect = 'postgres';
}

export default new Config();