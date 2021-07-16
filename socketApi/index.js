
//导入模型
const {
    mysqlDB
} = require( '../models/index')

const register =(req,res) => {
    // req.body.user_name,req.body.user_work_number  利用callback回调函数获取操作结果
    let sql = "INSERT INTO sp_users(user_name,user_work_number) VALUES("+`'${req.body.user_name}'`+","+`'${req.body.user_work_number}'`+");"
    mysqlDB(sql,(msg)=>{
        if(msg){
            res.send({
                meta:{
                    errorCode:200,
                    msg:'添加成功！'
                },
                data: msg
            })
        } else {
            res.send({
                meta:{
                    errorCode:400,
                    msg:'未响应！'
                }
            })
        }
    })
}
const taskAdd =(req,res) => {
    // req.body.task_name,req.body.task_type  利用callback回调函数获取操作结果
    let sql = "INSERT INTO sp_tasks(task_name,task_type) VALUES("+`'${req.body.task_name}'`+","+`'${req.body.task_type}'`+");"
    mysqlDB(sql,(msg)=>{
        if(msg){
            res.send({
                meta:{
                    errorCode:200,
                    msg:'添加成功！'
                },
                data: msg
            })
        } else {
            res.send({
                meta:{
                    errorCode:400,
                    msg:'未响应！'
                }
            })
        }
    })
}
const authAdd =(req,res) => {
    // req.body.auth_name,req.body.auth_type  利用callback回调函数获取操作结果
    let sql = "INSERT INTO sp_auths(auth_name,auth_type) VALUES("+`'${req.body.auth_name}'`+","+`'${req.body.task_type}'`+");"
    mysqlDB(sql,(msg)=>{
        if(msg){
            res.send({
                meta:{
                    errorCode:200,
                    msg:'添加成功！'
                },
                data: msg
            })
        } else {
            res.send({
                meta:{
                    errorCode:400,
                    msg:'未响应！'
                }
            })
        }
    })
}
const msgAdd =(req,res) => {
    // req.body.msg_content,req.body.msg_time,req.body.msg_userid  利用callback回调函数获取操作结果
    let sql = "INSERT INTO sp_messages(msg_content,msg_userid,msg_time) VALUES("+`'${req.body.msg_content}'`+","+`'${req.body.msg_userid}'`+","+`'${req.body.msg_time}'`+");"
    mysqlDB(sql,(msg)=>{
        if(msg){
            res.send({
                meta:{
                    errorCode:200,
                    msg:'添加成功！'
                },
                data: msg
            })
        } else {
            res.send({
                meta:{
                    errorCode:400,
                    msg:'未响应！'
                }
            })
        }
    })
}
const makeTask =(req,res) => {
    // req.body.user_id,req.body.task_id ,req.body.task_status 利用callback回调函数获取操作结果  不能插入重复数据  需提前校验 task_status参数
    // task_status选填：默认为0
    // create_time 默认当前时间
    // finish_time 完成时间选填
    let sql = "INSERT INTO usersTotasks (user_id,task_id,task_status) VALUES("+`'${req.body.user_id}'`+","+`'${req.body.task_id}'`+","+`'${req.body.task_status}'`+");"
    mysqlDB(sql,(msg)=>{
        if(msg){
            res.send({
                meta:{
                    errorCode:200,
                    msg:'添加成功！'
                },
                data: msg
            })
        } else {
            res.send({
                meta:{
                    errorCode:400,
                    msg:'未响应！'
                }
            })
        }
    })
}
const userAuth =(req,res) => {
    // req.body.user_id,req.body.task_id ,req.body.task_status 利用callback回调函数获取操作结果  不能插入重复数据  需提前校验 task_status参数
    // task_status选填：默认为0
    // create_time 默认当前时间
    // finish_time 完成时间选填
    let sql = "INSERT INTO usersTotasks (user_id,task_id,task_status) VALUES("+`'${req.body.user_id}'`+","+`'${req.body.task_id}'`+","+`'${req.body.task_status}'`+");"
    mysqlDB(sql,(msg)=>{
        if(msg){
            res.send({
                meta:{
                    errorCode:200,
                    msg:'添加成功！'
                },
                data: msg
            })
        } else {
            res.send({
                meta:{
                    errorCode:400,
                    msg:'未响应！'
                }
            })
        }
    })
}

const getUserList =(req,res) => {
    // 用户群组分页查询 req.query.curPage,req.query.pageSize,
    let sql = "select * from sp_users limit "+`${(req.query.curPage-1)*req.query.pageSize}`+","+`${req.query.pageSize}`+";"
    mysqlDB(sql,(msg)=>{
        if(msg){
            res.send({
                meta:{
                    errorCode:200,
                    msg:'查询成功！'
                },
                data: msg
            })
        } else {
            res.send({
                meta:{
                    errorCode:400,
                    msg:'查询失败！'
                }
            })
        }
    })
}
const getAuthList =(req,res) => {
    // 用户群组分页查询 req.query.user_id
    //根据用户工号进行查询个人权限  不用分页
    let sql = "select user_work_number,user_name,auth_name from sp_users,sp_auths,usersToauths WHERE " +
        "sp_users.user_work_number = "+`${req.query.user_id}`+" and" +
        " sp_users.user_work_number = usersToauths.user_work_id and " +
        "sp_auths.id = usersToauths.auth_id ;"
    mysqlDB(sql,(msg)=>{
        if(msg){
            let data ={
                user_id: msg[0].user_work_number,
                user_name: msg[0].user_name,
                user_auth: []
            }
            msg.map((item,index)=>{
                data.user_auth.push(item.auth_name)
            })
            res.send({
                meta:{
                    errorCode:200,
                    msg:'查询成功！'
                },
                data: data
            })
        } else {
            res.send({
                meta:{
                    errorCode:400,
                    msg:'查询失败！'
                }
            })
        }
    })
}
const getMsgList =(req,res) => {
    // 用户群组分页查询 req.query.curPage,req.query.pageSize,
    // let sql = "select * from sp_messages limit "+`${(req.query.curPage-1)*req.query.pageSize}`+","+`${req.query.pageSize}`+";"
    let sql = "select user_work_number,user_name,msg_content,msg_time from sp_users,sp_messages WHERE " +
        "sp_users.user_work_number = "+`${req.query.user_id}`+" and sp_users.user_work_number = sp_messages.msg_userid ;"
    mysqlDB(sql,(msg)=>{
        if(msg){
            res.send({
                meta:{
                    errorCode:200,
                    msg:'查询成功！'
                },
                data: msg
            })
        } else {
            res.send({
                meta:{
                    errorCode:400,
                    msg:'查询失败！'
                }
            })
        }
    })
}
const getTaskList =(req,res) => {
    // 所有可选任务
    let sql = "select * from sp_tasks limit "+`${(req.query.curPage-1)*req.query.pageSize}`+","+`${req.query.pageSize}`+";"
    mysqlDB(sql,(msg)=>{
        if(msg){
            res.send({
                meta:{
                    errorCode:200,
                    msg:'查询成功！'
                },
                data: msg
            })
        } else {
            res.send({
                meta:{
                    errorCode:400,
                    msg:'查询失败！'
                }
            })
        }
    })
}
const getInfoList =(req,res) => {
    // 查询个人信息 多表查询
    // let sql = "select * from sp_users limit "+`${(req.query.curPage-1)*req.query.pageSize}`+","+`${req.query.pageSize}`+";"
    // let sql = " select user_work_number,user_name,task_name,task_type,create_time,auth_name,auth_describe from sp_auths,sp_users,sp_tasks,usersTotasks,usersToauths WHERE sp_users.user_work_number = usersTotasks.user_id and sp_tasks.id = usersTotasks.task_id and sp_auths.id = usersToauths.auth_id and sp_users.user_work_number = usersToauths.user_work_id;"
    let sql = "select user_work_number,user_name,task_name,task_type,create_time from sp_users,sp_tasks,usersTotasks WHERE sp_users.user_work_number = usersTotasks.user_id and sp_tasks.id = usersTotasks.task_id ;"
    mysqlDB(sql,(msg)=>{
        if(msg){
            res.send({
                meta:{
                    errorCode:200,
                    msg:'查询成功！'
                },
                data: msg
            })
        } else {
            res.send({
                meta:{
                    errorCode:400,
                    msg:'查询失败！'
                }
            })
        }
    })
}

module.exports ={
    register,
    taskAdd,
    authAdd,
    msgAdd,
    makeTask,
    userAuth,
    getUserList,
    getAuthList,
    getMsgList,
    getTaskList,
    getInfoList
}
