const express=require('express');
const app=express();
const path = require('path');
const cron=require('node-cron');
const cors = require('cors');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const SibApiV3Sdk = require('sib-api-v3-sdk');


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
const sequelize=require('./server.js')
const Message=require('./models/Message.js')
const Group=require('./models/Group.js')
const Getgroup=require('./controllers/fetch-group.js')

// Middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));





const registerUser=require('./controllers/register')
const auth=require('./controllers/auth')
const login=require('./controllers/login')
const chatMessage=require('./controllers/chat')
const submitMessage=require('./controllers/submit-message.js');
const groupController=require('./controllers/group.js')
const groupMessageController=require('./controllers/group-message.js')
const joinGroup=require('./controllers/add-member.js')
const submitGroupMessage=require('./controllers/submit-groupmessage.js')
const addGroupUser=require('./controllers/member')
const allMember=require('./controllers/all-member.js')
const makeAdmin=require('./controllers/make-admin.js')
const uploadImage=require('./controllers/upload-image.js')
const verifyEmail=require('./controllers/verify-email.js')
const sendMail=require('./controllers/reset-password-link.js');
const updatePasswordController=('./controllers/updated-password.js');
console.log(updatePasswordController);
console.log(auth.authenticateUser);








const GroupMember=require('./models/GroupMember.js')
const GroupMessage=require('./models/GroupMessage.js')
const Archived=require('./models/Archived.js')




app.use(express.static(path.join(__dirname, 'public')));


app.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/register.html'))
})
app.post('/register',registerUser.addNewUser);
app.post('/login',login.verifyUser);

app.get('/chat', chatMessage.getAllMessagesMiddleware);
app.post('/chat',auth.authenticateUser,submitMessage.addMessage);

app.post('/group',auth.authenticateUser,upload.fields([{name:'groupname'}]), groupController.addGroup ),            // Route for handling POST requests to '/group'
        
  

app.get('/group',Getgroup.showGroups);
app.get('/groupmessage/:groupid',auth.authenticateUser,groupMessageController.Messages)
app.post('/joingroup/:groupid',auth.authenticateUser,joinGroup.joinGroup)
app.post('/postmessage/:groupid',auth.authenticateUser,submitGroupMessage.submitMessage)
app.post('/group/:groupId/:email/addmember',auth.authenticateUser,addGroupUser.addGroupUser);
app.post('/showmember/:groupId',allMember.showMembersByGroupId);
app.post('/makeadmin/:userId/:groupId/:groupName',auth.authenticateUser,makeAdmin.makeAdmin);
app.post('/uploadImage/:groupId',auth.authenticateUser,uploadImage.uploadToS3);
app.get('/newpassword',(req,res)=>{
  res.sendFile(path.join(__dirname,'./public/newpassword.html'))
})
////const storage = multer.memoryStorage();
app.post('/verifyEmail', verifyEmail.verifyEmail, (req, res) => {
  // Assuming you have the user ID and email available from somewhere else in your application
  const userId = req.user.id;
  const email = req.user.email;
  console.log(email);
  sendMail(email,userId)

  // Further logic here
});
//app.post('/newpassword/:userId',updatePasswordController.updatedPassword);
app.post('/newpassword/:userId', (req, res) => {
  updatePasswordController.updatedPassword(req, res, (response) => {
      res.status(response.status).json({ message: response.message });
  });
});

sequelize.sync();
//app.listen(3000, () => {
  //  console.log(`Server is running on port 3000`);
  //});
 
  server.listen(3000, () => {
    console.log('listening on *:3000');
  });