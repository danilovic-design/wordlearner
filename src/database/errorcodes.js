export const errorText = (errorCode) => {
  switch (errorCode) {
    case "auth/user-not-found":
      return "Invalid email/password";
    case "auth/wrong-password":
      return "Invalid email/password";
    case "auth/invalid-email":
      return "Invalid e-mail";
    case "auth/too-many-requests":
      return "Too many tries";
    case "auth/weak-password":
      return "Weak password";
    default:
      return "Unknown error";
  }
};
