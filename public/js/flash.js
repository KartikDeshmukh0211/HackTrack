document.addEventListener("DOMContentLoaded", () => {
  const flashContainer = document.getElementById("flash-messages");
  if (!flashContainer) return;

  // Set up auto-dismiss timers for each flash message
  const flashMessages = flashContainer.querySelectorAll(".flash-message");
  flashMessages.forEach((message) => {
    // Auto-dismiss after 5 seconds (matches the CSS progress animation)
    const timer = setTimeout(() => {
      dismissMessage(message);
    }, 5000);

    // Store the timer ID on the element
    message.dataset.timerId = timer;

    // Set up click handler for close button
    const closeButton = message.querySelector(".flash-close");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        // Clear the auto-dismiss timer
        clearTimeout(Number.parseInt(message.dataset.timerId));
        dismissMessage(message);
      });
    }
  });

  // Function to dismiss a message with animation
  function dismissMessage(message) {
    message.classList.add("removing");

    // Remove the message after animation completes
    message.addEventListener("animationend", () => {
      message.remove();

      // If no more messages, remove the container
      if (flashContainer.children.length === 0) {
        flashContainer.remove();
      }
    });
  }
});

// Function to programmatically add a flash message
window.addFlashMessage = (type, message) => {
  let flashContainer = document.getElementById("flash-messages");

  // Create container if it doesn't exist
  if (!flashContainer) {
    flashContainer = document.createElement("div");
    flashContainer.id = "flash-messages";
    flashContainer.className = "flash-container";
    document.body.appendChild(flashContainer);
  }

  // Create the message element
  const messageEl = document.createElement("div");
  messageEl.className = `flash-message flash-${type}`;
  messageEl.setAttribute("role", "alert");

  // Add icon based on type
  let iconClass = "info-circle";
  if (type === "success") iconClass = "check-circle";
  if (type === "error") iconClass = "exclamation-circle";
  if (type === "warning") iconClass = "exclamation-triangle";

  // Build the message HTML
  messageEl.innerHTML = `
          <div class="flash-icon">
              <i class="fas fa-${iconClass}"></i>
          </div>
          <div class="flash-content">
              <p>${message}</p>
          </div>
          <button class="flash-close" aria-label="Close message">
              <i class="fas fa-times"></i>
          </button>
          <div class="flash-progress"></div>
      `;

  // Add to container
  flashContainer.appendChild(messageEl);

  // Set up auto-dismiss timer
  const timer = setTimeout(() => {
    dismissMessage(messageEl);
  }, 5000);

  messageEl.dataset.timerId = timer;

  // Set up click handler for close button
  const closeButton = messageEl.querySelector(".flash-close");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      clearTimeout(Number.parseInt(messageEl.dataset.timerId));
      dismissMessage(messageEl);
    });
  }

  // Function to dismiss a message with animation
  function dismissMessage(message) {
    message.classList.add("removing");

    message.addEventListener("animationend", () => {
      message.remove();

      if (flashContainer.children.length === 0) {
        flashContainer.remove();
      }
    });
  }

  return messageEl;
};
