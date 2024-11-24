const crypto = require('crypto');

// Given MD5 hash of Alice's PIN
const targetHash = "5531a5834816222280f20d1ef9e95f69";

// Function to perform brute force attack
const findPIN = () => {
    for (let i = 0; i <= 9999; i++) {
        // Convert the number to a 4-digit PIN string (e.g., 7 -> "0007")
        const pin = i.toString().padStart(4, '0');
        
        // Calculate MD5 hash of the PIN
        const hash = crypto.createHash('md5').update(pin).digest('hex');
        
        // Check if the hash matches the target hash
        if (hash === targetHash) {
            return pin; // Return the matching PIN
        }
    }
    return null; // If no match is found
};

// Run the brute force attack
const pin = findPIN();
if (pin) {
    console.log(`Alice's PIN is: ${pin}`);
} else {
    console.log("PIN not found.");
}
