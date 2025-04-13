import { Link } from "react-router";
import AuthForm from "./AuthForm";
import authSvg from "../../assets/auth.svg";
const SignUp = () => {
  return (
    <div className="flex items-center justify-center w-full gap-12">
      <div className="w-full max-w-[564px] hidden lg:block">
        <img
          src={authSvg}
          alt="authentication illustration"
          className="w-full"
        />
      </div>
      <div className="w-full lg:max-w-[572px]">
        <div className="text-center">
          <h1 className="font-semibold fs-2xl">Let’s Join with us</h1>
          <h2 className="font-semibold fs-xl">Sign up</h2>
        </div>
        <AuthForm type={"signup"} />

        <div className="flex items-center justify-center gap-1 mt-8 font-medium">
          <p>Already have an account ?</p>
          <Link to={"/signin"} className="font-bold text-main hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
