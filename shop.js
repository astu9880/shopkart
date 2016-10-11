/**
 * Created by astitwa on 10/9/16.
 */
const mysql=require('mysql');


var getConnection = () => {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'newuser',
        password : 'newpassword',
        database : 'newdatabase'
    });

    connection.connect();

    return connection;
}


module.exports={
    show: (cb)=> {
        let connection = getConnection();
        connection.query('SELECT * FROM flopkart', function (err, rows, fields) {
            if (err) throw err;
            cb(rows);
        })
        connection.end();
    },
    add: (id,name,price,cb)=>{
        let connection=getConnection();

        connection.query('INSERT INTO flopkart VALUES('+id+',"'+name+'",'+price+')',function (err) {
            if(err) throw err;
            cb();
        });
        connection.end();
    },
    del: (id,cb)=>{
        let connection=getConnection();

        connection.query('DELETE FROM flopkart WHERE id='+id,function (err) {
            if(err) throw err;
            cb();
        });
        connection.end();

    }
}