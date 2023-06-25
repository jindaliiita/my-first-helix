function sendMessage(socket, chatbox) {
    var message = messageInput.value.trim();

    if (message !== '') {
        var chatMessage = {
        type: 'chat',
        sender: 'User',
        text: message
        };

        // Send the message to the server
        socket.send(JSON.stringify(chatMessage));

        // Append the message to the chatbox
        appendMessage('User', message, chatbox);

        // Clear the input field
        messageInput.value = '';

        // Scroll to the bottom of the chatbox
        chatbox.scrollTop = chatbox.scrollHeight;
    }
}

function appendMessage(sender, text, chatbox) {
    var messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `
        <span class="sender">${sender}:</span>
        <span class="text">${text}</span>
    `;
    chatbox.appendChild(messageElement);
}

export default function decorate(block) {
    // const cols = [...block.firstElementChild.children];
    block.innerHTML = `<div class="chatbox">
    <div class="message">
      <span class="sender">Chat Bot:</span>
      <span class="text">Welcome to the chat!</span>
    </div>
    <div class="message">
      <span class="sender">User:</span>
      <span class="text">Hello, how can I help?</span>
    </div>
    <!-- More messages here -->
  </div>
  <div class="user-input">
    <textarea id="messageInput" placeholder="Type your message..." rows="4"></textarea>
  </div>`;

  var messageInput = document.getElementById('messageInput');
    var chatbox = document.querySelector('.chatbox');
    var socket = new WebSocket('ws://localhost:3010'); // Replace with your WebSocket server URL

    // Event listener for WebSocket connection open
    socket.onopen = function() {
      console.log('WebSocket connection established.');
    };

    // Event listener for WebSocket messages
    socket.onmessage = function(event) {
      var message = JSON.parse(event.data);

      // Handle different message types from the server
      if (message.type === 'chat') {
        console.log(chatbox);
        appendMessage(message.sender, message.text, chatbox);
      }
    };

   

    messageInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage(socket, chatbox);
      }
    });

     // Event listener for WebSocket connection close
    //  socket.onclose = function() {
    //     console.log('WebSocket connection closed.');
    //   };
}

// function sendMessage() {
//     var message = messageInput.value.trim();

//     if (message !== '') {
//       var chatbox = document.querySelector('.chatbox');
//       var messageElement = document.createElement('div');
//       messageElement.classList.add('message');
//       messageElement.innerHTML = `
//         <span class="sender">User:</span>
//         <span class="text">${message}</span>
//       `;
//       chatbox.appendChild(messageElement);

//       // Clear the input field
//       messageInput.value = '';

//       // Scroll to the bottom of the chatbox
//       chatbox.scrollTop = chatbox.scrollHeight;
//     }
//   }
  