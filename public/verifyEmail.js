document.getElementById('verify').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior
    
    const email = document.getElementById('email').value;
    const data = {
        email: email
    };

    axios.post("http://localhost:3000/verifyEmail", data)
        .then((response) => {
            console.log('User exists');
            // Handle the response as needed
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
