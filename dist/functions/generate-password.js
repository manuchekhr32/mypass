"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassword = void 0;
function generatePassword(level) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{};:.<>/?';
    let password = '';
    function generateRandom(characters, length) {
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }
        return password;
    }
    switch (level) {
        case 'low':
            password = generateRandom(lowercase + uppercase, 8);
            break;
        case 'medium':
            password = generateRandom(lowercase + uppercase + numbers, 18);
            break;
        case 'high':
            password = generateRandom(lowercase + uppercase + numbers + symbols, 24);
            break;
    }
    return password;
}
exports.generatePassword = generatePassword;
//# sourceMappingURL=generate-password.js.map