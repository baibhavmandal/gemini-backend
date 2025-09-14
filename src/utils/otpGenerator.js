const otpGenerator = () => {
  return Math.floor(Math.random() * 9000) + 10000;
};

export default otpGenerator;
