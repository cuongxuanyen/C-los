import { parseISO, format } from "date-fns";

export function ExportFileExcel(dataResponeApiBase64: any, fileName: string) {
  /// Chuỗi base64 cần giải mã
  const base64String = dataResponeApiBase64;

  // Giải mã base64 thành dữ liệu nhị phân
  const binaryData = atob(base64String);

  // Tạo một mảng chứa dữ liệu nhị phân
  const array = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    array[i] = binaryData.charCodeAt(i);
  }

  // Tạo một Blob từ mảng dữ liệu nhị phân
  const blob = new Blob([array], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Tạo URL từ Blob
  const url = URL.createObjectURL(blob);

  // Tạo thẻ a ẩn để tạo liên kết tải xuống và kích hoạt sự kiện click
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName; // Tên tệp tin khi tải về
  document.body.appendChild(a);
  a.click();

  // Xóa thẻ a và URL đã tạo
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadFileZip(zipData: any, fileName: string) {
  /// Chuỗi base64 cần giải mã
  const base64String = zipData;

  // Giải mã base64 thành dữ liệu nhị phân
  const binaryData = atob(base64String);

  // Tạo một mảng chứa dữ liệu nhị phân
  const array = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    array[i] = binaryData.charCodeAt(i);
  }
  const blob = new Blob([array], { type: "application/zip" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = `${fileName}.zip`; // Tên tệp bạn muốn lưu
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadFilePDF(PDFData: any, fileName: string) {
  /// Chuỗi base64 cần giải mã
  const base64String = PDFData;

  // Giải mã base64 thành dữ liệu nhị phân
  const binaryData = atob(base64String);
  const byteNumbers = new Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    byteNumbers[i] = binaryData.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "application/pdf" });
  // tạo link để tải về
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = `${fileName}.pdf`; // Tên tệp bạn muốn lưu
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadFileXML(xmlData: any, fileName: string) {
  /// Chuỗi base64 cần giải mã
  const base64String = xmlData;

  // Giải mã base64 thành dữ liệu nhị phân
  const binaryData = atob(base64String);

  // Tạo một mảng chứa dữ liệu nhị phân
  const array = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    array[i] = binaryData.charCodeAt(i);
  }
  const blob = new Blob([array], { type: "text/xml;charset=utf-8" });

  const url = URL.createObjectURL(blob);

  // Tạo thẻ a ẩn để tạo liên kết tải xuống và kích hoạt sự kiện click
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName; // Tên tệp tin khi tải về
  document.body.appendChild(a);
  a.click();

  // Xóa thẻ a và URL đã tạo
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
export function convertTime(time: string, formatDate?: string) {
  if (time) {
    // Chuỗi ngày giờ cần chuyển đổi
    let dateString = time;
    if (typeof time === "string") {
      dateString = dateString.replace("+07:00", "");
    }
    const formatTime = formatDate ? formatDate : "dd-MM-yyyy HH:mm:ss";
    // Chuyển đổi chuỗi ngày giờ thành đối tượng Date
    const dateObject = parseISO(dateString);

    // Định dạng lại ngày giờ theo định dạng mong muốn
    const formattedDate = format(dateObject, formatTime);
    return formattedDate;
  } else {
    return "";
  }
}

//thêm dấu phẩy trong số tiền
export const formatAmount = (number: any) => {
  if (number) {
    //chuyển số sang string
    const valueNumber = number.toString();
    const format = valueNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return format;
  } else {
    return "0";
  }
};

export const convertData = (data: any) => {
  // hàm dùng để convert dữ liệu validate của BE sang dạng validate của react hook form
  const convertedData: any = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      convertedData[key] = { message: data[key] };
    }
  }
  return convertedData;
};

export const removeItemByKey = (data: any, keyToRemove: string) => {
  // hàm dùng để clear error tại 1 trường trong form
  return Object.keys(data || {}).reduce((acc: any, key) => {
    if (key !== keyToRemove) {
      acc[key] = data[key];
    }
    return acc;
  }, {});
};

//convert ký tự đặc biệt
export const convertCharacter = (
  text: any,
  keepChar?: any,
  charsToLimit?: string[],
  charLimits?: number[]
) => {
  if (text) {
    let textConvert = text;
    const regex = new RegExp(
      `[^a-zA-Z0-9\\s${
        keepChar || ""
      }àáạãảăắằẵặẳâấầậẫẩèéẹẽẻêềếểễệìíịĩỉòóọõỏôốồộỗộơớờợỡởùúụũủưứừựữửỳýỵỹỷđĐ]`,
      "g"
    );
    textConvert = textConvert.replace(regex, "");
    if (
      charsToLimit &&
      charLimits &&
      charsToLimit.length === charLimits.length
    ) {
      charsToLimit.forEach((char, index) => {
        const limit = charLimits[index];
        const charCount = (
          textConvert.match(new RegExp(`\\${char}`, "g")) || []
        ).length;
        if (charCount > limit) {
          let count = 0;
          textConvert = textConvert
            .split("")
            .filter((currentChar: any) => {
              if (currentChar === char) {
                count++;
                return count <= limit;
              }
              return true;
            })
            .join("");
        }
      });
    }
    return textConvert;
  } else {
    return "";
  }
};

export const convertRemoveIcon = (text: any) => {
  if (text) {
    let textConvert = text;
    textConvert = textConvert.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ""
    );
    return textConvert;
  } else {
    return "";
  }
};

export const handleReplaceText = (text: string, param: any) => {
  if (text !== "") {
    const textReplace = text.replace("{param}", param);
    return textReplace;
  } else {
    return "";
  }
};

export const formatCurrency = (value: number | string): string => {
  const stringValue = typeof value === "number" ? value.toString() : value;
  const [integerPart, decimalPart] = stringValue.split(".");
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );
  if (stringValue.includes(".")) {
    if (!decimalPart) {
      return `${formattedIntegerPart}.`;
    } else {
      return `${formattedIntegerPart}.${decimalPart}`;
    }
  }
  return formattedIntegerPart;
};

export const convertmoneyToNumber = (value: string) => {
  const stringValue = value.toString();
  return parseFloat(stringValue.replace(/,/g, ""));
};

export const removeEmoji = (event: any) => {
  event.preventDefault();
  // Lấy nội dung được dán vào
  const pastedText = event.clipboardData.getData("text");

  // Kiểm tra xem nội dung có chứa emoji không
  const containsEmoji =
    /[\uD800-\uDBFF][\uDC00-\uDFFF]|\u00A9|\u00AE|[\u2000-\u3300]|[\uFE00-\uFE0F]|\u1F000-\u1F77F]/.test(
      pastedText
    );
  return containsEmoji;
};

export const getTextDate = (date: any, time: string) => {
  if (date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formatDate: string = `${year}-0${month}-${
      day < 10 ? `0${day}` : day
    }T${time}.000Z`;
    return formatDate;
  }
  return "";
};


export const UpdateColorImage = (color: any, fileBase64: any) => {
  const base64String = fileBase64.includes("base64,")
    ? fileBase64.split("base64,")[1]
    : fileBase64;
  const decodedSVG = atob(base64String);
  const updatedSvgData = decodedSVG.replace(/fill="[^"]*"/g, `fill="${color}"`);
  console.log(updatedSvgData);
  const updatedBase64 = btoa(updatedSvgData);
  return `data:image/svg+xml;base64,${updatedBase64}`;
};

