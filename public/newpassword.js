document.getElementById('new').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior
    const url = window.location.href;
    const parts = url.split('/');
    const userId = parts[parts.length - 1]; // Extract UUID from the URL
  
;
  
    
    const email = document.getElementById('password').value;
    const data = {
        password: password
    };

    axios.post("http://localhost:3000/newpassword/${userId}", data)
        .then((response) => {
            console.log('User exists');
            // Handle the response as needed
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
