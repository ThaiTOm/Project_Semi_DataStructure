const API_DOMAIN = "http://localhost:3000/";

export const get = async (path) => {
  try {
    const res = await fetch(API_DOMAIN + path);

    if (!res.ok) {
      throw new Error(`Request failed with status: ${res.status}`);
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to get data");
  }
};

export const post = async (path, options) => {
  console.log(path);
  console.log(options);
  try {
    const res = await fetch(API_DOMAIN + path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });

    if (!res.ok) {
      throw new Error(`Request failed with status: ${res.status}`);
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to post data");
  }
};

export const patch = async (path, options) => {
  try {
    const res = await fetch(API_DOMAIN + path, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });
    if (!res.ok) {
      throw new Error(
        "mạng bị lỗi rồi hay sao á nên cập nhật không thành công bạn êyyy."
      );
    }
    const result = await res.json();
    return result;
  } catch (error) {
    throw new Error("Error in patch request:", error);
  }
};

export const put = async (path, options) => {
  try {
    const res = await fetch(API_DOMAIN + path, {
      method: "PUT",  
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });
    if (!res.ok) {
      throw new Error(
        "Mạng bị lỗi hoặc cập nhật không thành công."
      );
    }
    const result = await res.json();
    return result;
  } catch (error) {
    throw new Error("Lỗi trong quá trình thực hiện phương thức PUT:", error);
  }
};


export const del = async (path) => {
  console.log(path);
  try {
    const res = await fetch(API_DOMAIN + path, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Yêu cầu xóa không thành công. Mã lỗi: " + res.status);
    }
  } catch (error) {
    throw new Error("Có lỗi khi thực hiện yêu cầu xóa: " + error.message);
  }
};
