import * as Yup from "yup";

// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const userLoginValidation = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  mobile: Yup.string()
  .required("Mobile number is required")
  .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Mobile number is not valid")
});

export const forgotPasswordValidation = Yup.object().shape({
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Mobile number is not valid"),
});

export const resetPasswordValidation = Yup.object().shape({
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), ""], "Confirm password must match"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const loginValidation = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const signupValidationSchema = Yup.object().shape({
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Mobile number is not valid"),
  name: Yup.string()
  .required("Name is required")
  .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
});

// export const forgotPasswordSchema = Yup.object().shape({
//   password: Yup.string()
//     .required("Password is required")
//     .min(6, "Password must be at least 6 characters"),
//   confirmPassword: Yup.string().oneOf(
//     [Yup.ref("password"), null],
//     "Passwords must match"
//   ),
// });

export const otpValidationSchema = Yup.object().shape({
  otp: Yup.string()
    .required("OTP is required")
    .matches(/^[0-9]{6}$/, "OTP must be 6 digits and contain only numbers"),
});

export const registerValidationSchema = Yup.object().shape({
  // image: Yup.mixed()
  //   .required("Image is required")
  //   .test(
  //     "fileFormat",
  //     "Unsupported Format",
  //     value => value && SUPPORTED_FORMATS.includes(value.type)
  //   ),
  image: Yup.array()
    .of(
      Yup.mixed()
        .required('Please upload an image')
        .test(
          'fileType',
          'Unsupported file format',
          (value) =>
            value && ['image/jpeg', 'image/png','image/jpg'].includes(value.type)
        )
    )
    .min(3, 'Please upload at least three images'),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .matches(/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/,"Please enter valid mail formate"),
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Mobile number is not valid"),
  name: Yup.string()
  .required("Name is required")
  .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
  companyname: Yup.string().required("Company name is required"),
});

// export const bannerValidation = Yup.object().shape({
//   name: Yup.string().required("Name is required"),
// });

export const bookingValidationSchema = Yup.object().shape({
  advance: Yup.string()
    .required("Advance amount is required"),
  date: Yup.string()
    .required("Date is required"),
  location: Yup.string()
    .required("Location is required"),
  company: Yup.string()
  .required("Company name is required")
});