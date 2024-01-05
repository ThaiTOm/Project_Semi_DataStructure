module.exports.checkPassword = (password) => {
    // hàm check pass đúng định dạng
    // Yêu cầu tối thiểu 8 ký tự, ít nhất một chữ cái viết hoa, chữ cái viết thường và một chữ số
    if(password){
 const lengthRequirement = password.length >= 8;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;

    const hasUppercase = uppercaseRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasDigit = digitRegex.test(password);

    return lengthRequirement && hasUppercase && hasLowercase && hasDigit;
    }
   else {
    return false;
   }
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

module.exports.checkEmail = (email) => {
    // Biểu thức chính quy kiểm tra địa chỉ email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

module.exports.checkVietnamesePhoneNumber = (phoneNumber) => {
    // biểu thức chính quy kiểm tra số điện thoại Việt Nam
    const vietnamesePhoneNumberPattern = /^(0[0-9]{9})$/;

    // danh sách đầu số điện thoại hợp lệ
    const validAreaCodes = [
      "096",
      "097",
      "098",
      "032",
      "033",
      "034",
      "035",
      "036",
      "037",
      "038",
      "039", // Viettel
      "091",
      "094",
      "088",
      "083",
      "084",
      "085",
      "081",
      "082", // VinaPhone
      "090",
      "093",
      "089",
      "070",
      "079",
      "077",
      "076",
      "078", // MobiFone
    ];

    // kiểm tra đầu số và độ dài của số điện thoại
    if (vietnamesePhoneNumberPattern.test(phoneNumber)) {
      const areaCode = phoneNumber.substring(0, 3);

      if (validAreaCodes.includes(areaCode)) {
        return true; // hợp lệ
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  module.exports.checkName = (name) => {
    // Biểu thức chính quy kiểm tra tên
    const nameRegex = /^[a-zA-ZÀ-Ỹà-ỹ\s]+$/;
  
    // Kiểm tra xem tên có khớp với biểu thức chính quy không
    return nameRegex.test(name);
  }