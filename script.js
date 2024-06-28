document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Intersection Observer for section visibility
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Form submission
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

    emailjs.send('service_9jjiwi1', 'template_1chnnmq', templateParams)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        showNotification(`Thank you, ${name}! Your message has been sent.`, 'success');
        document.getElementById('contact-form').reset();
      }, function(error) {
        console.log('FAILED...', error);
        showNotification('Failed to send message. Please try again later.', 'error');
      });
  });

  // Custom notification function
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
});