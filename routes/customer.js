const mysql = require('mysql');

class Customer {
    constructor(customerID, username, password) {
        this.customerID = customerID;
        this.username = username;
        this.password = password;
    }

    static login(username, password, callback) 
    {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'josh16rog', 
            database: 'artemdata'
        });

        const sqlQuery = `SELECT idCustomer, userName, passwordUser
        FROM artemdata.customerdata
        WHERE userName = ? AND passwordUser = ?`;

        connection.query(sqlQuery, [username, password], (error, results) => {
            if (error) 
            {
                connection.end();
                return callback(error);
            }

            if (results.length > 0) 
            {
                const userData = results[0];
                const customer = new Customer(
                    userData.idCustomer,
                    userData.userName,
                    userData.passwordUser
                );
                callback(null, customer);
            } else {
                callback(null, null); // User not found
            }
            connection.end();
        });
    }
}

module.exports = Customer;

