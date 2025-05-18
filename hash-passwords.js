const bcrypt = require('bcrypt');

async function run() {
  const pw1 = await bcrypt.hash('password123', 10);
  const pw2 = await bcrypt.hash('secure456', 10);

  console.log("Alice's hash:", pw1);
  console.log("Bob's hash:", pw2);
}

run();
