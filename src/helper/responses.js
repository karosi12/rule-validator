const responses = {
  success: (message, data) => {
    const successMessage = {
      message,
      status: "success",
      data,
    };
    return successMessage;
  },
  error: (message) => {
    const errorMessage = {
      message,
      status: "error",
      data: null,
    }
    return errorMessage;
  }
};
export default responses;