export const checkValidOrNot = (email, password) => {
  const isEmailValid =
    /^([a-zA-Z0-9]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/.test(email);
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isEmailValid) return "EmailId is not valid.";
  if (!isPasswordValid) return "Password is not valid.";
  return null;
};
