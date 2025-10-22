// Show sidebar function
        function showSidebar() {
            const sideBar = document.querySelector('.nav-sidebar-container');
            sideBar.style.display = 'block';
        }
// Hide sidebar function
        function hideSidebar() {
            const sideBar = document.querySelector('.nav-sidebar-container');
            sideBar.style.display = 'none';
        }

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('success-message');
    
    if (!form) {
        console.error('Contact form not found!');
        return;
    }
    
    // Form validation rules
    const validationRules = {
        fullName: {
            required: true,
            minLength: 2
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        subject: {
            required: true,
            minLength: 3
        },
        message: {
            required: true,
            minLength: 10
        }
    };

    // Validate individual field
    function validateField(fieldName, value) {
        const rules = validationRules[fieldName];
        let isValid = true;
        let errorMessage = '';

        if (rules.required && !value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (rules.minLength && value.length < rules.minLength) {
            isValid = false;
            errorMessage = `Must be at least ${rules.minLength} characters`;
        } else if (fieldName === 'email' && rules.pattern && !rules.pattern.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }

        return { isValid, errorMessage };
    }

    // Update field validation state - FIXED VERSION
    function updateFieldValidation(field, isValid, errorMessage) {
        // Get the field name for error element ID
        const fieldName = field.name;
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (!errorElement) {
            console.warn(`Error element not found for field: ${fieldName}`);
            return isValid;
        }
        
        if (!isValid) {
            field.classList.add('error');
            errorElement.textContent = errorMessage;
            errorElement.setAttribute('aria-hidden', 'false');
        } else {
            field.classList.remove('error');
            errorElement.textContent = '';
            errorElement.setAttribute('aria-hidden', 'true');
        }
        
        return isValid;
    }

    // Validate entire form
    function validateForm(formData) {
        let isFormValid = true;
        
        Object.keys(validationRules).forEach(fieldName => {
            const field = form.elements[fieldName];
            if (!field) {
                console.warn(`Field not found: ${fieldName}`);
                return;
            }
            
            const value = formData.get(fieldName) || '';
            const { isValid, errorMessage } = validateField(fieldName, value);
            
            if (!updateFieldValidation(field, isValid, errorMessage)) {
                isFormValid = false;
            }
        });
        
        return isFormValid;
    }

    // Real-time validation on input
    form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('blur', function() {
            const formData = new FormData(form);
            const value = formData.get(this.name) || '';
            const { isValid, errorMessage } = validateField(this.name, value);
            updateFieldValidation(this, isValid, errorMessage);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                const formData = new FormData(form);
                const value = formData.get(this.name) || '';
                const { isValid, errorMessage } = validateField(this.name, value);
                updateFieldValidation(this, isValid, errorMessage);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const isFormValid = validateForm(formData);
        
        if (isFormValid) {
            // Simulate form submission
            const submitButton = form.querySelector('[data-testid="test-contact-submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
            }
            
            // In a real application, you would send data to a server here
            setTimeout(() => {
                if (successMessage) {
                    successMessage.hidden = false;
                    successMessage.focus();
                }
                form.reset();
                
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                }
                
                // Scroll to success message
                if (successMessage) {
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1000);
        } else {
            // Focus on first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.focus();
            }
        }
    });

    // Keyboard navigation enhancement
    form.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeElement = document.activeElement;
            if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
                activeElement.blur();
            }
        }
    });
});