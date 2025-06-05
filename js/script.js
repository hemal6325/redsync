// This file can be used for any custom JavaScript functionality that applies across multiple pages.
// Page-specific JS (like form validation, dashboard logic) is embedded directly in each HTML file for clarity.

document.addEventListener('DOMContentLoaded', function() {
    console.log('REDSYNC general frontend script loaded!');

    // Add any global JS functionality here if needed.
    // Example: A generic logout function that could be called from any page's navbar
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            if (confirm('Are you sure you want to log out from REDSYNC?')) {
                // In a real application, you would make an API call to your backend to clear the session.
                /*
                fetch('/api/logout', { method: 'POST', headers: { 'X-CSRF-TOKEN': 'YOUR_CSRF_TOKEN_HERE' } })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Logout success:', data);
                        // Redirect to login page after successful logout
                        window.location.href = 'login.html';
                    })
                    .catch(error => {
                        console.error('Logout error:', error);
                        // Even if error, attempt to redirect to login as session might be stale
                        window.location.href = 'login.html';
                    });
                */
                // For this frontend demo, simply redirect:
                window.location.href = 'login.html';
            }
        });
    }

    /**
     * Shows a Bootstrap toast notification.
     * @param {string} message The message to display in the toast body.
     * @param {string} type The type of notification (e.g., 'success', 'danger', 'info', 'warning').
     * @param {string} [title='Notification'] The title of the toast.
     * @param {number} [delay=5000] The delay before the toast auto-hides in milliseconds.
     */
    window.showNotification = function(message, type, title = 'Notification', delay = 5000) {
        const notificationContainer = document.getElementById('notificationContainer');
        if (!notificationContainer) {
            console.error('Notification container not found! Cannot show toast.');
            // Fallback to alert if container doesn't exist
            alert(`${title}: ${message}`);
            return;
        }

        const toastId = `toast-${Date.now()}`;
        const toastHtml = `
            <div class="toast align-items-center text-white bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true" id="${toastId}">
                <div class="toast-header">
                    <strong class="me-auto text-${type}">${title}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body bg-white text-dark">
                    ${message}
                </div>
            </div>
        `;

        notificationContainer.insertAdjacentHTML('beforeend', toastHtml);

        const toastEl = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastEl, {
            autohide: true,
            delay: delay
        });

        toastEl.addEventListener('hidden.bs.toast', function () {
            toastEl.remove(); // Remove toast element from DOM after it's hidden
        });

        toast.show();
    };
});