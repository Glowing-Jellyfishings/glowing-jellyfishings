const chatForm = document.getElementById('chat-form');
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

const trainForm = document.getElementById('train-form');
const trainInput = document.getElementById('train-input');
const trainLabel = document.getElementById('train-label');

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage('user', message);
  userInput.value = '';

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  appendMessage('bot', data.reply);
});

trainForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = trainInput.value.trim();
  const label = trainLabel.value;
  if (!input) return;

  await fetch('/api/train', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input, label })
  });

  trainInput.value = '';
  alert('Training sample added!');
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
