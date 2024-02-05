import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
type TInputProps = {
  name: string;
  type: string;
  label?: string;
};
const MHInput = ({ name, type, label }: TInputProps) => {
  return (
    <div style={{ marginBottom: "12px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input {...field} type={type} id={name} size="large"></Input>
          </Form.Item>
        )}
      />
    </div>
  );
};

export default MHInput;
