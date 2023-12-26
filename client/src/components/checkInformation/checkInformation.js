  // check đầu số có hợp lệ không
 export const checkVietnamesePhoneNumber = (phoneNumber) => {
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
        return "block"; // hợp lệ
      } else {
        return "Số điện thoại không hợp lệ!";
      }
    } else {
      return "Số điện thoại không hợp lệ!";
    }
  };

  // hàm check địa chỉ có đúng yêu cầu không
 export const checkAddress = (value, empty = 0) => {
    const minLength = 5;
    const forbiddenCharacters = /[\\"'?\^*%]/;
    console.log(empty);
    if(empty === 1) {
      return "block";
    }
    if (!value || value.length < minLength) {
      return "Địa chỉ phải có ít nhất 5 ký tự!";
    }

    if (!/[a-zA-Z]/.test(value)) {
      return "Địa chỉ phải chứa ít nhất một ký tự chữ cái!";
    }

    if (forbiddenCharacters.test(value)) {
      return "Địa chỉ không được chứa các ký tự \\ ' \" ? ^ * %!";
    }
    return "block"; // hợp lệ
  };
