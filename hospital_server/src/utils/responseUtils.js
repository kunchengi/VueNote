// 成功响应
const successResponse = (res, data, message = '操作成功') => {
  return res.json({
    code: 200,
    success: true,
    data,
    message
  });
};

// 错误响应
const errorResponse = (res, statusCode, message, error = null) => {
  return res.status(statusCode).json({
    code: statusCode,
    success: false,
    message,
    error: error ? error.message : null
  });
};

// 参数验证响应
const validationErrorResponse = (res, message = '参数验证失败') => {
  return errorResponse(res, 400, message);
};

module.exports = {
  successResponse,
  errorResponse,
  validationErrorResponse
};
