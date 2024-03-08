// Assuming you have the token and userinfo stored in local storage after login
// Assuming you have the token and userinfo stored in local storage after login
//import io from 'socket.io-client';
//const socket = io();

const token = localStorage.getItem('token');
console.log(token);

const userinfo = localStorage.getItem('userinfo');
console.log(userinfo);

const headers = {
  'Authorization': token,
  'Content-Type': 'multipart/form-data' // Set Content-Type header
};

const container = document.getElementById('messageContainer');

// Function to fetch old messages from local storage

// Function to display messages in the DOM
function makeAdmin(userId,groupId,groupName) {
  const data={};
  // Make a POST request to your server endpoint to update the user's admin status
  axios.post(`http://localhost:3000/makeadmin/${userId}/${groupId}/${groupName}`,{data},{headers})
      .then(response => {
          // Handle the response if needed
          console.log('User is now admin:', response.data);
      })
      .catch(error => {
          // Handle any errors
          console.error('Error making user admin:', error);
      });
}


function displayMessages(messages) {
  container.innerHTML = '';
  
  messages.forEach(message => {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message');

      const senderDiv = document.createElement('div');
      senderDiv.classList.add('sender');
      senderDiv.textContent = `${message.Name}:`;

      if (message.type === 'text') {
          const contentDiv = document.createElement('div');
          contentDiv.classList.add('content');
          contentDiv.textContent = message.message;
          messageDiv.appendChild(senderDiv);
          messageDiv.appendChild(contentDiv);
      } else if (message.type === 'image') {
          const image = new Image();
          image.src = message.url;
          image.classList.add('image');
          image.onload = () => {
              container.scrollTop = container.scrollHeight;
          };
          messageDiv.appendChild(senderDiv);
          messageDiv.appendChild(image);
      }

      container.appendChild(messageDiv);
  });

 
  container.scrollTop = container.scrollHeight;
}


document.getElementById('submitgroup').addEventListener('click', function (event) {
  
  
  const group = document.getElementById('group');
  const groupname=group.value;
  const formData = new FormData();
  formData.append('groupname', groupname);
  // Add any other form data fields as needed
  event.preventDefault();
   axios.post("http://localhost:3000/group",formData,{ headers })
   .then((response) => {
    console.log('group created');
  
})
.catch((error) => {
    console.error('Error:', error);
});


});

function showGroup(groups) {
  const container = document.getElementById('groupcontainer');

  // Check if there are any groups
  if (groups && groups.length > 0) {
    // Create an unordered list to display the groups
    const ul = document.createElement('ul');

    // Iterate through each group and create list items
    groups.forEach(group => {
      const li = document.createElement('li');
      li.textContent = `${group.groupName}`;

      // Add a class when the mouse enters the list item
      li.addEventListener('mouseenter', () => {
        li.classList.add('hovered');
      });

      // Remove the class when the mouse leaves the list item
      li.addEventListener('mouseleave', () => {
        li.classList.remove('hovered');
      });

      // Add a click event listener to each list item
      li.addEventListener('click', () => {
        // Handle the click event, e.g., show more details about the clicked group
          const groupId=group.id;
         
        axios.get(`http://localhost:3000/groupmessage/${group.id}`,{headers})
          .then(response => {
            // Handle the response data, e.g., display it or perform further actions
            console.log('GET request successful:', response.data);
            // Update the right side with the new messages
            displayMessages(response.data); // Replace with your actual function
            // Append input field and submit button for new messages
            appendMessageInput(groupId);
            appendMemberInput(groupId)
          })
          .catch(error => {
            console.error('Error making GET request:', error);
          });
      });
      function appendMemberInput(groupId) {
        const inputContainer = document.createElement('div');
        inputContainer.id = 'addMemberContainer';
        inputContainer.innerHTML = `
            <input type="email" id="newMemberEmail" placeholder="Enter email">
            <button id="addMemberButton">Add Member</button>
            <button id="allMembersButton">All Members</button>
        `;
        
        document.body.appendChild(inputContainer);
    
        // Add event listener to the "Add Member" button
        const addMemberButton = document.getElementById('addMemberButton');
        addMemberButton.addEventListener('click', () => {
            addMemberToGroup(groupId);
        });
        const allMembersButton = document.getElementById('allMembersButton');
    allMembersButton.addEventListener('click', () => {
      document.getElementById("groupMembersContainer").style.display = "block";
         fetchgroupmember(groupId)
    });
    }
    let isDisplayed = false;

    function fetchgroupmember(groupId) {
        axios.post(`http://localhost:3000/showmember/${groupId}`)
            .then(response => {
                // Handle the response data, e.g., display it or perform further actions
                console.log('Group members:', response.data);
                if (!isDisplayed) {
                    displayGroupMembers(response.data.groupMembers);
                    isDisplayed = true;
                } else {
                    clearGroupMembers();
                    isDisplayed = false;
                }
                // You can implement logic here to display the group members, e.g., in a modal or a list
            })
            .catch(error => {
                console.error('Error fetching group members:', error);
            });
    }
    
    function clearGroupMembers() {
        // Clear the container by setting its innerHTML to an empty string
        const container = document.getElementById('groupMembersContainer');
        container.innerHTML = '';
    }
    
    function displayGroupMembers(groupMembers) {
      // Assuming you have a container element with id "groupMembersContainer" where you want to display the group members
      const container = document.getElementById('groupMembersContainer');
  
      // Clear the container before appending new group members
      container.innerHTML = '';
  
      // Loop through each group member in the response and create HTML elements to display them
      groupMembers.forEach(member => {
          const memberElement = document.createElement('div');
          memberElement.classList.add('member');
  
          // Construct the HTML content for each member
          let memberInfoHTML =  `<p><strong>Name:</strong> ${member.name}</p>
              
          `;
  
      
          if (member.admin) {
            console.log('admin')
              // If member is an admin, add an icon to indicate it
              memberInfoHTML += `<p><i class="fas fa-crown"></i> Admin</p>`;


          } else {
              // If member is not an admin, add a button to make them admin
              memberInfoHTML += `<button class="make-admin-btn" 
                            data-user-id="${member.userId}" 
                            data-group-id="${member.groupId}" 
                            data-group-name="${member.groupName}"> 
                            Make Admin 
                      </button>`;
    console.log('not admin')
          }
  
          // Set the HTML content for the member element
          memberElement.innerHTML = memberInfoHTML;
  
          // Append the member element to the container
          container.appendChild(memberElement);
  
          // Add event listener for "Make Admin" button
        if (!member.admin) {
              const makeAdminButton = memberElement.querySelector('.make-admin-btn');
              makeAdminButton.addEventListener('click', () => {
                  const userId = makeAdminButton.dataset.userId;
                  const groupId = makeAdminButton.dataset.groupId;
                  const groupName=makeAdminButton.dataset.groupName;
                  console.log(groupId);
                  console.log(userId)
                  makeAdmin(userId,groupId,groupName);
              });
          }
      });
  }
  
  


  
    // Assuming you have a container element with id "groupMembersContainer" where you want to display the group members
   

  
         
    
    
    function addMemberToGroup(groupId) {
        const newMemberEmaill = document.getElementById('newMemberEmail')
        const email=newMemberEmaill.value;
        console.log(email);
        const data={
          email:email
        }
    
        // Send request to add the new member to the group
        axios.post(`http://localhost:3000/group/${groupId}/${email}/addmember`, { headers })
            .then(response => {
                // Handle success
                console.log('New member added successfully:', response.data);
                
                
                
                // You may want to update the UI to reflect the addition of the member
            })
            .catch(error => {
                // Handle error
                console.error('Error adding new member:', error);
            });
    }

      // Create a join group icon
      const joinGroupIcon = document.createElement('span');
      joinGroupIcon.innerHTML = '&#x1F465;'; // Unicode character for a person icon, you can replace it with your preferred icon

      // Add a click event listener for joining the group
      joinGroupIcon.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the click event from triggering the li click event
        axios.post(`http://localhost:3000/joingroup/${group.id}`, {}, { headers })
          .then(response => {
            // Handle the response data, e.g., display it or perform further actions
            //console.log('Join group clicked for Group ID:', group.id);
            console.log(response)
          })
          .catch(error => {
            console.error('Error making POST request:', error);
          });
      });

      // Append the join group icon to the list item
      li.appendChild(joinGroupIcon);

      ul.appendChild(li);
    });

    // Append the unordered list to the container
    container.appendChild(ul);
  } 
}

function appendMessageInput(groupId) {
  if (document.getElementById('inputContainer')) {
    return; // If it exists, do nothing
}

const inputcontainer = document.createElement('div');
inputcontainer.id = 'inputContainer';
  // Create an input field for text message
  const textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.placeholder = 'Type your message...';

  // Create a file input field for image selection
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  

  // Create a submit button
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';

  // Create an image icon for visually representing image upload
  const imageIcon = document.createElement('img');
  imageIcon.src = 'image_icon.png'; // Provide the path to your image icon
  imageIcon.classList.add('image-icon'); // Add a class for styling
  imageIcon.addEventListener('click', () => {
    fileInput.click();
  });
  // Append the input fields, image icon, and button to the container
  inputcontainer.appendChild(textInput);
  inputcontainer.appendChild(fileInput);
  inputcontainer.appendChild(imageIcon);
  inputcontainer.appendChild(submitButton);

  // Add event listener to submit button
  submitButton.addEventListener('click', () => {
      const message = textInput.value;
      const file = fileInput.files[0];
      console.log(message);

      if (file) {
          const formData = new FormData();
          formData.append('image', file);

          // Log the FormData object to the console
          console.log('FormData:', formData);

          // Send image to backend
          axios.post(`http://localhost:3000/uploadImage/${groupId}`, formData, { headers })
              .then(response => {
                  console.log('Image uploaded successfully:', response.data.imageUrl);
                  // Handle the response data, e.g., display it or perform further actions
              })
              .catch(error => {
                  console.error('Error uploading image:', error);
                  // Handle error
              });
      } else {
        const formData = new FormData();
          formData.append('message', message);
          

          const data = {
              message: message
          };
          console.log(data.message);

          // Send text message to backend
          axios.post(`http://localhost:3000/postmessage/${groupId}`,formData, { headers })
              .then(response => {
                  console.log('POST request successful:', response.data);
                  // Emit a 'new message' event from the client side
                  socket.emit('new message', { groupId, message: data }, (ack) => {
                      if (ack === 'ok') {
                          console.log('Event "new message" emitted successfully');
                      } else {
                          console.log('Event "new message" failed to emit');
                      }
                  });

                  // Handle the response data, e.g., display it or perform further actions
              })
              .catch(error => {
                  console.error('Error making POST request:', error);
                  io.emit('postMessage', { groupId, message: data });

                  // Handle error
              });
      }

      console.log(`New message for Group ID ${groupId}:`, message);
      // Clear the input fields after submitting
      textInput.value = '';
      fileInput.value = null;
  });

  // Append the container to the document body or any other parent element
  document.body.appendChild(inputcontainer);
}


// Call the showgroup function with the groups data


axios.get("http://localhost:3000/group")
  .then(response => {
    console.log(response);
    showGroup(response.data);
  })
  .catch(error => {
    console.log('Failed to fetch groups:', error);
  })
  socket.on('received', (groupId) => {
    console.log('socket is working ')
    // Call the function to fetch and display messages for the specified group
    axios.get(`http://localhost:3000/groupmessage/${groupId}`, { headers })
      .then(response => {
        // Handle the response data, e.g., update the frontend display
        console.log('GET request successful:', response.data);
        // Update the right side with the new messages
        displayMessages(response.data);
        appendMessageInput(groupId);
       appendMemberInput(groupId) // Replace with your actual function to display messages
      })
      .catch(error => {
        console.error('Error making GET request:', error);
      });
  });
  document.getElementById("logout").addEventListener("click", function() {
    // Perform logout actions here
    const token = localStorage.getItem('token');
  

 
          
              // Call the logout function when the button is clicked
              localStorage.removeItem('token');

              // Redirect the user to the login page
              window.location.href = "./register.html"
  })

  