const responses = {
  success: (message, data) => {
    const successMessage = {
      message,
      status: "success",
      data,
    };
    return successMessage;
  },
  error: (message, data = null) => {
    const errorMessage = {
      message,
      status: "error",
      data,
    }
    return errorMessage;
  }
};
export default responses;