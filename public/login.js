
document.getElementById('login').addEventListener('submit', function (event) {
    // Check if the elements exist
  //  const tname = document.getElementById('name');
   // const tlastname = document.getElementById('lastname');
    const temail = document.getElementById('email');
    const tpassword = document.getElementById('password');
    //const tnumber = document.getElementById('number');

    if (temail && tpassword) {
        event.preventDefault(); // Prevent the form from submitting normally

      //  const name = tname.value;
        //const lastname = tlastname.value;
        const email = temail.value;
        const password = tpassword.value;
        //const number = tnumber.value;

        console.log('Email:', email);
        console.log('Password:', password);

        // Create a data object to send in the POST request
        const data = {
          //  name: name,
            //lastname: lastname,
            email: email,
            password: password,
           // number: number
        };

        // Make a POST request to the /register route using Axios
        axios.post("http://localhost:3000/login", data)
            .then((response) => {
                console.log('ducess login');
                const token=response.data;
                // Handle the response as needed
                //const token = "your_received_token";

// Store the token in local storage
               localStorage.setItem('token', token);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});
