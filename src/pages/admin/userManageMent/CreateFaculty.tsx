import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import {
  useGetAcademicDepartmentsQuery,
  useGetAcademicFacultiesQuery,
} from "../../../redux/featuers/admin/academicManagement.Api";
import MHForm from "../../../Components/form/MHForm";
import MHSelect from "../../../Components/form/MHSelect";
import MHInput from "../../../Components/form/MHInput";
import MHDatePicker from "../../../Components/form/MHDatePicker";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import { toast } from "sonner";
import { useAddFacultyMutation } from "../../../redux/featuers/admin/userManagement.Api";

const CreateFaculty = () => {
  const [addFaculty, { data, error }] = useAddFacultyMutation();
  console.log(data, error);
  const { data: aFData, isLoading: aFIsLoading } =
    useGetAcademicFacultiesQuery(undefined);
  const { data: dData, isLoading: dIsLoading } =
    useGetAcademicDepartmentsQuery(undefined);

  const academicFacultyOptions = aFData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating......");
    const facultyData = {
      password: "student123",
      faculty: data,
    };
    console.log(facultyData);
    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data.image);

    try {
      const res = (await addFaculty(formData)) as any;

      if (res?.error) {
        console.log(res.error);
        toast.error(res?.error?.data?.message, { id: toastId, duration: 1000 });
      } else {
        toast.success(res?.data?.message, {
          id: toastId,
          duration: 1000,
        });
      }
    } catch (error) {
      console.log(error);
    }
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

          <Divider>Academic Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <MHSelect
                options={academicFacultyOptions}
                disabled={aFIsLoading}
                name="academicFaculty"
                label="Academic Faculty"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <MHSelect
                options={departmentOptions}
                disabled={dIsLoading}
                name="academicDepartment"
                label="Academic Department"
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </MHForm>
      </Col>
    </Row>
  );
};

export default CreateFaculty;
