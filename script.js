// js/script.js

document.addEventListener('DOMContentLoaded', function() {

    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Active navigation link highlighting
    // This ensures the correct link is highlighted even if the URL has parameters or hash
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        // Remove any existing 'active' class and aria-current
        link.classList.remove('active');
        link.removeAttribute('aria-current');

        // Get the link's href attribute
        const linkPath = new URL(link.href).pathname;

        // Handle the homepage case (index.html or just '/')
        if ((currentPath === '/' || currentPath.endsWith('/index.html')) && (linkPath === '/' || linkPath.endsWith('/index.html'))) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
        // Handle other pages
        else if (linkPath !== '/' && !linkPath.endsWith('/index.html') && currentPath.includes(linkPath)) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });


    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission for this demo

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const formMessageDiv = document.getElementById('form-message');

            // Clear previous messages
            formMessageDiv.innerHTML = '';
            nameInput.classList.remove('is-invalid');
            emailInput.classList.remove('is-invalid');
            messageInput.classList.remove('is-invalid');

            let isValid = true;

            if (!nameInput.value.trim()) {
                nameInput.classList.add('is-invalid');
                isValid = false;
            }
            if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            }
            if (!messageInput.value.trim()) {
                messageInput.classList.add('is-invalid');
                isValid = false;
            }

            if (!isValid) {
                formMessageDiv.innerHTML = '<div class="alert alert-danger" role="alert">Please correct the errors in the form.</div>';
                return;
            }

            // If using Formspree, this is where the form would naturally submit.
            // For this demo, we'll simulate success.
            // If you set an 'action' attribute on the form (e.g., for Formspree),
            // you might want to handle the submission via fetch API for a smoother UX
            // or let the browser handle the redirect.

            console.log('Form Submitted (simulated):');
            console.log('Name:', nameInput.value.trim());
            console.log('Email:', emailInput.value.trim());
            console.log('Phone:', document.getElementById('phone') ? document.getElementById('phone').value.trim() : 'N/A');
            console.log('Subject:', document.getElementById('subject') ? document.getElementById('subject').value : 'N/A');
            console.log('Message:', messageInput.value.trim());

            formMessageDiv.innerHTML = '<div class="alert alert-success" role="alert">Thank you! Your message has been "sent" (check the console). For a real site, this would go to an email.</div>';
            contactForm.reset(); // Clear the form

            // Remove the success message after a few seconds
            setTimeout(() => {
                formMessageDiv.innerHTML = '';
            }, 7000);
        });
    }
});

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Optional: Smooth scroll for anchor links (e.g., "Get Directions" button)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.getAttribute('href').length > 1) { // Ensure it's not just "#"
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Check if the target is on the current page
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            // If the targetId is on another page (e.g., contact.html#map from index.html),
            // the default browser behavior will handle the navigation and jump.
        });
    }
});

// Optional: Initialize a lightbox if you add one (e.g., Lightbox2)
// if (typeof lightbox !== 'undefined') {
//     lightbox.option({
//       'resizeDuration': 200,
//       'wrapAround': true
//     });
// }