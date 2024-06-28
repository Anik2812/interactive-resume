document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const templateParams = {
        from_name: name,
        from_email: email,
        message: message
    };

    emailjs.send('service_9jjiwi1', 'template_1chnnmq', templateParams) // Replace with your EmailJS service ID and template ID
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert(`Thank you, ${name}! Your message has been sent.`);
        }, function(error) {
            console.log('FAILED...', error);
            alert('Failed to send message. Please try again later.');
        });
});