const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://imgs.search.brave.com/C7q7NEfdX5Rm7VXSyr_NYB7-H4hvxKd3xDW1HlkMZKA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tdmVj/dG9yL2J1c2luZXNz/LW1hbi1hdmF0YXIt/cHJvZmlsZV8xMTMz/MjU3LTI0MzEuanBn/P3NlbXQ9YWlzX3Rl/c3RfYiZ3PTc0MCZx/PTgw"
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;