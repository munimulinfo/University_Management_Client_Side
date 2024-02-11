import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import MHForm from "../../../Components/form/MHForm";
import MHSelect from "../../../Components/form/MHSelect";
import MHInput from "../../../Components/form/MHInput";
import MHDatePicker from "../../../Components/form/MHDatePicker";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import { useAddAdminMutation } from "../../../redux/featuers/admin/userManagement.Api";

const CreateAdmin = () => {
  const [addAdmim, { data, error }] = useAddAdminMutation();
  console.log(data, error);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const adminData = {
      password: "admin123",
      admin: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(adminData));
    formData.append("file", data.image);
    addAdmim(formData);

    // //! This is for development
    // //! Just for checking
    console.log(Object.fromEntries(formData));
  };

  return (
    <Row justify="center">
      <Col span={24}>
        <MHForm onSubmit={onSubmit}>
          <Divider>Personal Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <MHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <MHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <MHInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <MHSelect options={genderOptions} name="gender" label="Gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <MHDatePicker name="dateOfBirth" label="Date of birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <MHSelect
                options={bloodGroupOptions}
                name="bloogGroup"
                label="Blood group"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <MHInput type="text" name="designation" label="Designation" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider>Contact Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <MHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <MHInput type="text" name="contactNo" label="Contact" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <MHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <MHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <MHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </MHForm>
      </Col>
    </Row>
  );
};

export default CreateAdmin;
