module.exports.checkPassword = (password) => {
    // hàm check pass đúng định dạng
    // Yêu cầu tối thiểu 8 ký tự, ít nhất một chữ cái viết hoa, chữ cái viết thường và một chữ số
    const lengthRequirement = password.length >= 8;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;

    const hasUppercase = uppercaseRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasDigit = digitRegex.test(password);

    return lengthRequirement && hasUppercase && hasLowercase && hasDigit;
}

module.exports.checkUsername = (username) => {
      // hàm check username
    // Yêu cầu ít nhất 8 ký tự
    const minLength = 8;
    const hasValidLength = username.length >= minLength;

    // Yêu cầu ký tự hợp lệ: chữ cái, số, ký tự đặc biệt như gạch dưới
    const isValidCharacters = /^[A-Za-z0-9_-]*$/.test(username);

    return hasValidLength && isValidCharacters;
}