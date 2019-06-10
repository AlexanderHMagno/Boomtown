export default function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  if (values.fullname && !values.fullname) {
    errors.password = "Required";
  }
  return errors;
}

export const required = value => {
  if (value) {
    if (value === "admin") return undefined;
    if (value.length < 5) {
      return "Min 6 digits! Please! ";
    } else {
      if (value.includes("@")) {
        return undefined;
      } else {
        return "where is your @?";
      }
    }
  } else {
    return "Required";
  }
};

export const required_password = value => {
  if (value) {
    if (value === "admin") return undefined;
    return value.length < 6 ? "Please add a longest password" : undefined;
  } else {
    return "Required";
  }
};

export const required_name = value =>
  value ? undefined : "May I know your name?";
