import { jwtDecode } from "jwt-decode";
import { useUserLoginMutation } from "../redux/featuers/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/featuers/auth/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button, Row } from "antd";
import MHForm from "../Components/form/MHForm";
import MHInput from "../Components/form/MHInput";
import { FieldValues } from "react-hook-form";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userLogin] = useUserLoginMutation();
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        password: data?.password,
        id: data?.userId,
      };
      const result = await userLogin(userInfo).unwrap();
      const user = jwtDecode(result?.data?.accessToken);
      const saveUser = {
        user: user,
        token: result?.data?.accessToken,
      };
      dispatch(setUser(saveUser));
      toast.success(result?.message, { id: toastId, duration: 2000 });
      navigate(`/${user?.role}/dashboard`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <MHForm onSubmit={onSubmit}>
        <MHInput type="text" name="userId" label="ID:"></MHInput>
        <MHInput type="password" name="password" label="Password:"></MHInput>
        <Button htmlType="submit">Login</Button>
      </MHForm>
    </Row>
  );
};

export default Login;
