import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  defaultvalue?: any;
};

const MHSelect = ({
  label,
  name,
  options,
  disabled,
  mode,
  defaultvalue,
}: TPHSelectProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Select
              defaultValue={defaultvalue}
              mode={mode}
              style={{ width: "100%" }}
              {...field}
              options={options}
              size="large"
              disabled={disabled}
            />
            {error && <small style={{ color: "red" }}>{error?.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default MHSelect;
