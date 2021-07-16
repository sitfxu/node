var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var underscore =require('underscore')
const bodyParser =require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

const Controller = require( './controller/index')
const SocketApi = require( './socketApi/index')
app.get('/', function(req, res){
  res.send('server is running');
});
//用户录入
app.post('/register',Controller.register)
//任务录入
app.post('/taskAdd',Controller.taskAdd)
//权限录入
app.post('/authAdd',Controller.authAdd)
//消息录入
app.post('/msgAdd',Controller.msgAdd)
//事件创建
app.post('/makeTask',Controller.makeTask)
//用户权限
app.post('/userAuth',Controller.userAuth)

//获取用户群组列表
app.get('/getUserList',Controller.getUserList)
//获取用户个人权限
app.get('/getAuthList',Controller.getAuthList)
//获取用户消息列表
app.get('/getMsgList',Controller.getMsgList)
//获取用户任务
app.get('/getTaskList',Controller.getTaskList)
// //获取用户消息
// app.get('/getInfoList',Controller.getInfoList)



var users = {}; //个人列表s
var clients = {}; //用户列表
io.on("connection", function (socket) {
    /**
     * {
        username:'张三',
        work_number:'102211'
      }
     用户登录时join
     * **/
    socket.on("join", function(userData){  //user_id
        // clients[client.id] = userData.work_number;
        users[userData.work_number] = socket.id;
        clients[userData.work_number] = socket;
        // clients[userData.client.id] = userData.username;
        socket.emit("getUser", Controller.getInfoList(userData.work_number));
        // client.broadcast.emit("update", clients)
    });


    /**
     * {
          username:'张三',
          work_number:'102211',
          notifier:[],
          task_name:'仓库收货'
        }
     * */
    socket.on("submit", function(submitData){
        let msg = submitData.username + '完成了' + submitData.task_name
        for(let i =0;i<submitData.notifier.length;i++){
            if(typeof clients[submitData.notifier[i]] === 'object'){
                clients[submitData.notifier[i]].emit("getMsg", msg);
            }
        }
    });

    socket.on("disconnect", function(){
    	console.log(socket.id +"Disconnect");
        for(var key in clients){
            if(clients[key] === socket.id){
                delete clients[key];
            }
        }
        // console.log(clients[client.id] +"Disconnect");
        // io.emit("update", clients[socket.id] + " has left the server.");
        // delete clients[socket.id];
    });
});




http.listen(3000, function(){
  console.log('listening on port 3000');
});
