const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline');

// Given MD5 hash of Bob's password
const targetHash = "578ed5a4eecf5a15803abdc49f6152d6";

// Path to the downloaded password file
const passwordFile = "500-worst-passwords.txt";

// Function to perform dictionary attack
const findPassword = async () => {
    const fileStream = fs.createReadStream(passwordFile);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    for await (const password of rl) {
        // Trim any extra spaces or newlines
        const trimmedPassword = password.trim();

        // Calculate MD5 hash of the password
        const hash = crypto.createHash('md5').update(trimmedPassword).digest('hex');

        // Check if the hash matches the target hash
        if (hash === targetHash) {
            return trimmedPassword; // Return the matching password
        }
    }

    return null; // If no match is found
};

// Run the dictionary attack
findPassword().then((password) => {
    if (password) {
        console.log(`Bob's password is: ${password}`);
    } else {
        console.log("Password not found in the dictionary.");
    }
}).catch((err) => {
    console.error("An error occurred:", err);
});
