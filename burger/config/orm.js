var connection = require("./connection");


// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

var orm = {
    selectAll: function (table, cb) {
        var query = `select * from ${table};`;
        connection.query(query, function (err, data) {
            if (err) {
                throw err;
            }
            cb(data);
        });
    },
    insertOne: function (table, col, val, cb) {
        var query = `insert into ${table}`;
        query += `(`;
        query += col.toString();
        query += `)`;
        query += `values (`;
        query += printQuestionMarks(val.length);
        query += `)`;

        console.log(query);

        connection.query(query, vals, function (err, data) {
            if (err) {
                throw err;
            }

            cb(data);
        });
    },
    updateOne: function (table, objColVals, condition, cb) {
        var query = `update ${table}`;
        query += `set`;
        query += objToSql(objColVals);
        query += `where`;
        query += condition;

        console.log(query);

        connection.query(query, function (err, data) {
            if (err) {
                throw err;
            }
            cb(data);
        });
    }
};

module.exports = orm;

