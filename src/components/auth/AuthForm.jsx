import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn, signUp } from "../../store/features/auth/authSlice";
import Input from "./Input";

const validationSchemaSignIn = Yup.object().shape({
  email: Yup.string().required("Email is Required").email("Enter Vaild Email"),
  password: Yup.string().required("Password is Required"),
});

const validationSchemaSignUp = Yup.object().shape({
  name: Yup.string()
    .required("Name is Required")
    .min(3, "Name must be at least 3 character"),
  email: Yup.string().email("Enter Valid Email").required("Email is Required"),
  password: Yup.string()
    .required("Password is Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+])[A-Za-z\d@$!%*?&#^()\-_=+]{8,}$/,
      "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password is Required"),
});

const initialValuesSignIn = {
  email: "",
  password: "",
};

const initialValuesSignUp = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const AuthForm = ({ type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues:
        type === "signin" ? initialValuesSignIn : initialValuesSignUp,
      validationSchema:
        type === "signin" ? validationSchemaSignIn : validationSchemaSignUp,
      onSubmit: ({ email, password }) =>
        type === "signin"
          ? dispatch(signIn({ email, password, navigate }))
          : dispatch(signUp({ email, password, navigate })),
    });
  return (
    <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
      {type === "signup" && (
        <Input
          id={"name"}
          type={"name"}
          name={"name"}
          value={values.name}
          handleChange={handleChange}
          handleBlur={handleBlur}
          placeholder={"enter your name"}
          touched={touched.name}
          errors={errors.name}
          label={"Name"}
        />
      )}
      <Input
        id={"email"}
        type={"email"}
        name={"email"}
        value={values.email}
        handleChange={handleChange}
        handleBlur={handleBlur}
        placeholder={"enter your email"}
        touched={touched.email}
        errors={errors.email}
        label={"Email"}
      />
      <Input
        id={"password"}
        type={"password"}
        name={"password"}
        value={values.password}
        handleChange={handleChange}
        handleBlur={handleBlur}
        placeholder={"enter your password"}
        touched={touched.password}
        errors={errors.password}
        label={"Password"}
      />
      {type === "signup" && (
        <Input
          id={"confirmPassword"}
          type={"password"}
          name={"confirmPassword"}
          value={values.confirmPassword}
          handleChange={handleChange}
          handleBlur={handleBlur}
          placeholder={"enter your password"}
          touched={touched.confirmPassword}
          errors={errors.confirmPassword}
          label={"Confirm Password"}
        />
      )}

      <button className="px-6 py-4 border text-white border-main bg-main duration-300 hover:bg-white hover:text-main rounded text-lg capitalize">
        {type === "signin" ? "Sign in" : "Sign up"}
      </button>
    </form>
  );
};

export default AuthForm;
