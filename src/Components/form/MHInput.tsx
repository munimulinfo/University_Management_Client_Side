import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
type TInputProps = {
  name: string;
  type: string;
  label?: string;
  disabled?: boolean;
  defaulValue?: any;
};
const MHInput = ({ name, type, label, disabled, defaulValue }: TInputProps) => {
  return (
    <div style={{ marginBottom: "12px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              defaultValue={defaulValue}
              type={type}
              id={name}
              size="large"
              disabled={disabled}
            ></Input>
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default MHInput;
