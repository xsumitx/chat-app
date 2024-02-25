// Assuming you have the token and userinfo stored in local storage after login
// Assuming you have the token and userinfo stored in local storage after login
const token = localStorage.getItem('token');
console.log(token);

const userinfo = localStorage.getItem('userinfo');
console.log(userinfo);

const headers = {
  'Authorization': token,
  // Add any other headers if needed
};

const container = document.getElementById('messageContainer');

// Function to fetch old messages from local storage

// Function to display messages in the DOM
function displayMessages(messages) {
  container.innerHTML = '';
    messages.forEach(message => {

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');

        const senderDiv = document.createElement('div');
        senderDiv.classList.add('sender');
        senderDiv.textContent = ` ${message.Name} :${message.GroupMessage} `;
        messageDiv.appendChild(senderDiv);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');
        contentDiv.textContent = message.Message;
        messageDiv.appendChild(contentDiv);

        container.appendChild(messageDiv);
    });

    // Optionally, scroll to the bottom to show the latest messages
    container.scrollTop = container.scrollHeight;
}

// Set up polling to fetch chat messages and display userinfo every second
 //setInterval(fetchChatMessages, 1000);



//document.getElementById('submit').addEventListener('click', function (event) {
 // event.preventDefault();
  
 // const message = document.getElementById('message');
  

  
       // Prevent the form from submitting normally

    
    //  const messages = message.value;
      //const data = {
        
        //  message:messages
          
         
    //  };

      // Make a POST request to the /register route using Axios
     // axios.post("http://localhost:3000/chat", data, { headers })
       //   .then((response) => {
         //     console.log('ducess login');
            
         // })
          //.catch((error) => {
            //  console.error('Error:', error);
          //});
  

//});
document.getElementById('submitgroup').addEventListener('click', function (event) {
  
  
  const group = document.getElementById('group');
  const groupname=group.value;
  const data={
    groupname:groupname
  };
  event.preventDefault();
   axios.post("http://localhost:3000/group",data,{headers})
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
      li.textContent = `${group.GroupName}`;

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
         
        axios.get(`http://localhost:3000/groupmessage/${group.id}`, { headers })
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
          let memberInfoHTML = `
              <p><strong>Member Name:</strong> ${member.Name}</p>
              <p><strong>Group ID:</strong> ${member.GroupId}</p>
          `;
  
          // Check if member is an admin
          if (member.Admin) {
              // If member is an admin, add an icon to indicate it
              memberInfoHTML += `<p><i class="fas fa-crown"></i> Admin</p>`;
          } else {
              // If member is not an admin, add a button to make them admin
              memberInfoHTML += `<button class="make-admin-btn" data-user-id="${member.UserId}" data-group-id="${member.GroupId}">Make Admin</button>`;
          }
  
          // Set the HTML content for the member element
          memberElement.innerHTML = memberInfoHTML;
  
          // Append the member element to the container
          container.appendChild(memberElement);
  
          // Add event listener for "Make Admin" button
          if (!member.Admin) {
              const makeAdminButton = memberElement.querySelector('.make-admin-btn');
              makeAdminButton.addEventListener('click', () => {
                  const userId = makeAdminButton.dataset.userId;
                  const groupId = makeAdminButton.dataset.groupId;
                  makeAdmin(userId, groupId);
              });
          }
      });
  }
  
  function makeAdmin(userId, groupId) {
    // Make a POST request to your server endpoint to update the user's admin status
    axios.post(`http://localhost:3000/makeadmin/${userId}/${groupId}`)
        .then(response => {
            // Handle the response if needed
            console.log('User is now admin:', response.data);
        })
        .catch(error => {
            // Handle any errors
            console.error('Error making user admin:', error);
        });
}


  
    // Assuming you have a container element with id "groupMembersContainer" where you want to display the group members
   

  
         
    
    
    function addMemberToGroup(groupId) {
        const newMemberEmail = document.getElementById('newMemberEmail').value;
        // Perform validation if necessary
        // Example: Check if the email is valid before adding
    
        // Send request to add the new member to the group
        axios.post(`http://localhost:3000/group/${groupId}/addmember`, { email: newMemberEmail }, { headers })
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
            console.log('Join group clicked for Group ID:', group.id);
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
  function appendMessageInput(groupId) {
    // Remove any existing input and submit button
    //clearMessageInput();
  
    // Create an input field
    
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type your message...';
  
    // Create a submit button
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', () => {
      const message = input.value;
      const data = {
        message: message
      };
  
      axios.post(`http://localhost:3000/postmessage/${groupId}`, data, { headers })
        .then(response => {
          // Handle the response data, e.g., display it or perform further actions
          console.log('POST request successful:', response.data);
        })
        .catch(error => {
          console.error('Error making POST request:', error);
        });
  
      console.log(`New message for Group ID ${groupId}:`, message);
      // Clear the input field after submitting
      input.value = '';
    });
  
    // Append the input field and submit button to the container for the respective group
    
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.appendChild(input);
    messageContainer.appendChild(submitButton);
    
  }
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
