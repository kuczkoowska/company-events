export const formatResponse = (data, message = 'Success', status = 200) => {
  return {
    status,
    message,
    data,
  };
};

export const handleError = (error) => {
  console.error(error);
  return {
    status: 500,
    message: 'Internal Server Error',
  };
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const generateRandomString = (length) => {
  return Math.random().toString(36).substring(2, length + 2);
};