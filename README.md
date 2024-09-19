# 🔐 OTP Input React App

Live Demo: [Check it out here! 🚀](https://otp-app-three.vercel.app)

This project is a simple OTP (One-Time Password) input form, built using React. It includes seamless keyboard interaction, validation, and paste functionality for an optimal user experience. 

## ✨ Features

- **4-digit OTP input fields** 🔢: Allows only numeric inputs.
- **Keyboard interaction** ⌨️:
  - Navigate between input fields using left/right arrow keys.
  - Automatically move to the next field as digits are entered.
  - Backspace moves to the previous field when the current one is empty.
- **Paste support** 📋: Paste a 4-digit code and it will automatically distribute across the input fields.
- **Validation** ✅:
  - Matches the OTP code passed via a URL parameter.
  - The submit button turns green and becomes clickable when the correct OTP is entered.
  - Button stays disabled until the correct OTP is inputted.

## 📦 Getting Started

Follow these steps to run the project locally:

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-repo/otp-app.git
cd otp-app
