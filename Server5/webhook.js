const crypto = require('crypto');

function verifySignature(req, secret) {
  const signature = req.headers['x-hub-signature-256'];
  if (!signature) return false;

  const payload = JSON.stringify(req.body);
  const hmac = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  const expectedSignature = `sha256=${hmac}`;

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

exports.handleWebhook = (req, res) => {
  const isValid = verifySignature(req, process.env.WEBHOOK_SECRET);

  if (!isValid) {
    console.warn('❌ Invalid webhook signature');
    return res.status(401).send('Invalid signature');
  }

  // Sanitize user input before logging to prevent log injection
  const sanitizedBody = JSON.stringify(req.body).replace(/[\n\r]/g, "");
  console.log('✅ Verified webhook event:', sanitizedBody);
  // You can add custom logic here based on event type
  res.sendStatus(200);
};
