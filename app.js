const express=require('express');
const app=express();
const path = require('path');
const cors = require('cors');
app.use(express.json());
app.use(cors());
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







const GroupMember=require('./model/GroupMembers')
const GroupMessages=require('./model/GroupMessages')



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

sequelize.sync()
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
  });
