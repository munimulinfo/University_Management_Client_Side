import { useUserLoginMutation } from "../redux/featuers/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/featuers/auth/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button, Row } from "antd";
import MHForm from "../Components/form/MHForm";
import MHInput from "../Components/form/MHInput";
import { FieldValues } from "react-hook-form";
import { verifyToken } from "../utils/verifyToken";

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
      const user = verifyToken(result?.data?.accessToken) as TUser;
      const saveUser = {
        user: user,
        token: result?.data?.accessToken,
      };
      dispatch(setUser(saveUser));
      toast.success(result?.message, { id: toastId, duration: 2000 });
      if (result.data.needsPasswordChange) {
        navigate(`/change-password`);
      } else {
        navigate(`/${user?.role}/dashboard`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId, duration: 2000 });
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
