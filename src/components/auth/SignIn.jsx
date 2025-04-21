import { Link } from "react-router";
import AuthForm from "./AuthForm";
import authSvg from "../../assets/auth.svg";

const SignIn = () => {
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
          <h1 className="font-semibold fs-2xl">Welcome Back</h1>
          <h2 className="font-semibold fs-xl">Sign in</h2>
        </div>
        <AuthForm type={"signin"} />
        <div className="flex items-center justify-center gap-1 mt-8 font-medium">
          <p>Don’t have an account ?</p>
          <Link to={"/signup"} className="font-bold text-main hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
