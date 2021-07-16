let mysql = require("mysql");
let poolDB  = mysql.createPool({
    host     : 'cdb-hbgmcxc1.gz.tencentcdb.com',
    user     : 'root',
    password : 'zd202020',
    port:'10167',
    database : 'user_tasks'
});

const mysqlDB =(sql,callback)=>{
    poolDB.getConnection((err, conn)=>{
        if(err){
            console.log("建立连接失败");
        } else {
            conn.query(sql, (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    callback(res);
                    conn.release();
                }
            })
        }
    })
}

module.exports ={
    mysqlDB
}
