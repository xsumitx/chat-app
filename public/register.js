console.log('hi');
document.getElementById('register').addEventListener('submit', function (event) {
    // Check if the elements exist
    const tname = document.getElementById('name');
    const tlastname = document.getElementById('lastname');
    const temail = document.getElementById('email');
    const tpassword = document.getElementById('password');
    const tnumber = document.getElementById('number');

    if (temail && tpassword) {
        event.preventDefault(); // Prevent the form from submitting normally

        const name = tname.value;
        const lastname = tlastname.value;
        const email = temail.value;
        const password = tpassword.value;
        const number = tnumber.value;

        console.log('Email:', email);
        console.log('Password:', password);

        // Create a data object to send in the POST request
        const data = {
            name: name,
            lastname: lastname,
            email: email,
            password: password,
            number: number
        };

        // Make a POST request to the /register route using Axios
        axios.post("http://localhost:3000/register", data)
            .then((response) => {
                console.log('I am inside the then block');
                console.log(response.data);
                // Handle the response as needed
            })
            .catch((error) => {
               // console.error('Error:', error);
            });
    }
});

// Add click event listener to the "Signin" link
document.getElementById('signinLink').onclick = async function (e) {
   
    window.location.href="./login.html"
    console.log('done');
}
