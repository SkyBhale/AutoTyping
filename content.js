
//Create a function to start auto typing
function autoTypeID() {
  const displayIDElement = document.querySelector('#quoteDisplay'); // Get the ID where the display is from
  const inputField = document.querySelector('#quoteInput'); // ID of the input where the typings should be placed

  if (displayIDElement && inputField) {
      const displayID = displayIDElement.textContent || displayIDElement.innerText;

      // Set the value of the input field
      inputField.value = displayID;

      // Trigger an input event to simulate typing
      const event = new Event('input', { bubbles: true });
      inputField.dispatchEvent(event);

      // Update the quoteDisplay with a new random ID (or any logic you want)
      displayIDElement.textContent = `New ID: ${Math.random().toString(36).substring(2, 15)}`; // Example of changing the display ID

      // Send a success response
      return { status: "success" };
  } else {
      console.log("Elements not found");
      return { status: "error", message: "Elements not found" };
  }
}

// Function to observe changes in the DOM
function observeDOMChanges() {
  const targetNode = document.body; // Observe the entire body
  const config = { childList: true, subtree: true };

  const callback = function(mutationsList) {
      for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
              const displayIDElement = document.querySelector('#quoteDisplay');
              const inputField = document.querySelector('#quoteInput');
              if (displayIDElement && inputField) {
                  autoTypeID();
                  observer.disconnect(); 
                  break;
              }
          }
      }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

// Start observing for DOM changes
observeDOMChanges();

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "autoType") {
      const response = autoTypeID();
      sendResponse(response);
  } else {
      sendResponse({ status: "error", message: "Unknown action" });
  }
});