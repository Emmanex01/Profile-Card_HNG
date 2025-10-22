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
 
 // Update time in milliseconds
        function updateTime() {
            const timeElement = document.getElementById('current-time');
            const currentTime = Date.now();
            timeElement.textContent = currentTime;
            timeElement.classList.add('time-update');
            
            setTimeout(() => {
                timeElement.classList.remove('time-update');
            }, 500);
        }
        
        // Initial update
        updateTime();
        
        // Update time every second
        setInterval(updateTime, 1000);
        
        // Handle avatar upload functionality
        const avatarElement = document.querySelector('[data-testid="test-user-avatar"]');
        const avatarUploadInput = document.querySelector('.avatar-upload');
        
        // In a real implementation, you would handle file upload and display
        // This is just a demonstration of the concept
        function handleAvatarUpload(event) {
            const file = event.target.files[0];
            console.log('Selected file:', file);
            if (!file) {
                console.log('No file selected');
                avatarElement.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?...";
                return;
            }

            if (!file.type.startsWith('image/')) {
                alert('Please select an image file.');
                return;
            }

            const oldUrl = avatarElement.src;
            const localUrl = URL.createObjectURL(file);
            avatarElement.src = localUrl;

            if (oldUrl.startsWith("blob:")) {
                URL.revokeObjectURL(oldUrl);
            }

            console.log('Avatar updated:', file.name);
        }

        
        // For demonstration, we'll add a click handler to show the concept
        avatarUploadInput.addEventListener('change', handleAvatarUpload);