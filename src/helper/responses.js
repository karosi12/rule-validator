const responses = {
  success: (message, data) => {
    const successMessage = {
      success: "success",
      message,
      data,
    };
    return successMessage;
  }
};
export default responses;