const express=require('express');
const app=express();
const path = require('path');
const cron=require('node-cron');
const cors = require('cors');
const multer = require('multer');

app.use(express.json());
app.use(cors());

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for 'new message' event
  socket.on('new message', (message, ack) => {
    console.log('Received new message:', message);
    
    // Extract the groupId from the message object
    const { groupId, data } = message;

    // Emit the groupId back to the client
    if (groupId) {
      io.emit('received', groupId);
    } else {
      console.error('Error: groupId not provided');
    }

    // Handle the received data as needed
    // You can perform further processing here
    // For example, you can broadcast the message to other clients:
    // io.emit('broadcast', data);

    // Send acknowledgment back to the client if required
    if (ack) {
      ack('Message received successfully');
    }
  });
});











const jwt=require('jsonwebtoken');
const sequelize=require('./model/server.js')
const Message=require('./model/message.js')
const Group=require('./model/groups.js')
const Getgroup=require('./controllers/fetchgroup')

// Middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));





const registeruser=require('./controllers/register')
const auth=require('./controllers/auth')
const login=require('./controllers/login')
const chatmessages=require('./controllers/chat')
const submitMessage=require('./controllers/submitMessage');
const Groupcontroller=require('./controllers/groups')
const Groupmessagecontroller=require('./controllers/groupmessages')
const joingroup=require('./controllers/addmemeber')
const submitgroupmessages=require('./controllers/submitgroupmessage')
const addgroupUser=require('./controllers/member')
const allmembers=require('./controllers/allmembers')
const makeadmin=require('./controllers/makeadmin')
const uploadimage=require('./controllers/uploadimage')








const GroupMember=require('./model/GroupMembers')
const GroupMessages=require('./model/GroupMessages')
const Archived=require('./model/archived')




app.use(express.static(path.join(__dirname, 'public')));


app.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/register.html'))
})
app.post('/register',registeruser.addNewUser);
app.post('/login',login.verifyUser);

app.get('/chat', chatmessages.getAllMessagesMiddleware);
app.post('/chat',auth.authenticateUser,submitMessage.addMessage);
app.post('/group',Groupcontroller.addgroup);
app.get('/group',Getgroup.showGroups);
app.get('/groupmessage/:groupid',auth.authenticateUser,Groupmessagecontroller.messages)
app.post('/joingroup/:groupid',auth.authenticateUser,joingroup.joinGroup)
app.post('/postmessage/:groupid',auth.authenticateUser,submitgroupmessages.submitmessage)
app.post('/group/:groupId/addmember',addgroupUser.addgroupUser);
app.post('/showmember/:groupId',allmembers.showMembersByGroupId);
app.post('/makeadmin/:userId/:groupId',makeadmin.makeadmin);
app.post('/uploadImage/:groupId',auth.authenticateUser,uploadimage.uploadToS3);
////const storage = multer.memoryStorage();


sequelize.sync();
//app.listen(3000, () => {
  //  console.log(`Server is running on port 3000`);
  //});
 
  server.listen(3000, () => {
    console.log('listening on *:3000');
  });
