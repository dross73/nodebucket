/*
============================================
; Title: base-response.js
; Author: Dan Ross
; Date: 20 March 2021
; Modified By: Dan Ross
; Description: This is the base response file.
;===========================================
*/

/**
 * @param  {*} httpCode - pass the specified http code.
 * @param  {*} message - shows the message to the user
 * @param  {*} data - Returns an object or null.
 * @param  {*} .toLocaleDateString("en-US" - pass current date.
 */
class BaseResponse {
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
    this.timestamp = new Date().toLocaleDateString("en-US");
  }

  /**
   * Description: toObject function, part of the BaseResponse class
   * @returns new object literal with all of the BaseResponse fields (httpCode,        message, data, timestamp)
   */
  toObject() {
    return {
      httpCode: this.httpCode,
      message: this.message,
      data: this.data,
      timestamp: this.timestamp,
    };
  }
}

module.exports = BaseResponse;
