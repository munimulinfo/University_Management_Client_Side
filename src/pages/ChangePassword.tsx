import { Button, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { TResponse } from "../types";
import { useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { logOut } from "../redux/featuers/auth/authSlice";
import MHForm from "../Components/form/MHForm";
import MHInput from "../Components/form/MHInput";
import { useChangePasswordMutation } from "../redux/featuers/admin/userManagement.Api";
import { toast } from "sonner";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    const res = (await changePassword(data)) as TResponse<any>;
    if (res?.data?.success) {
      dispatch(logOut());
      toast.success(res?.data?.message);
      navigate("/login");
    } else if (res?.error) {
      toast.error(res?.error?.data?.message);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <MHForm onSubmit={onSubmit}>
        <MHInput type="text" name="oldPassword" label="Old Password" />
        <MHInput type="text" name="newPassword" label="New Password" />
        <Button htmlType="submit">Login</Button>
      </MHForm>
    </Row>
  );
};

export default ChangePassword;
