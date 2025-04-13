import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../database/supabase";
import { logOut } from "../store/features/auth/authSlice";

const Home = () => {
  const { data } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const signOut = async () => {
    await supabase.auth.signOut();
    dispatch(logOut());
  };
  return (
    <div className="p-5">
      {data?.user?.email}
      <button
        onClick={signOut}
        className="text-error border border-error ms-4 p-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
