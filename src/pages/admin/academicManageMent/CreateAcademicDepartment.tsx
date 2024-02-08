import MHForm from "../../../Components/form/MHForm";
import { SubmitHandler, FieldValues } from "react-hook-form";
import MHSelect from "../../../Components/form/MHSelect";
import {
  useAddAcademicDepartmentMutation,
  useGetAcademicFacultiesQuery,
} from "../../../redux/featuers/admin/academicManagement.Api";
import { Button } from "antd";

type DepertMentOpetions = {
  value: string;
  label: string;
};

const CreateAcademicDepartment = () => {
  const { data: academicFaculty, isLoading } =
    useGetAcademicFacultiesQuery(undefined);
  console.log(academicFaculty, isLoading);
  const [addAcademicDepertMent, { data, error }] =
    useAddAcademicDepartmentMutation();
  console.log(data, error);

  const depertMentOptions: DepertMentOpetions[] =
    academicFaculty?.data?.map((item) => ({
      value: item._id,
      label: item.name,
    })) || [];

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const depertMentName = depertMentOptions.find(
      (item) => item?.value === data?.name
    );
    const depertMentData = {
      name: depertMentName?.label,
      academicFaculty: data?.name,
    };
    addAcademicDepertMent(depertMentData);
  };
  return (
    <MHForm onSubmit={onSubmit}>
      <MHSelect
        options={depertMentOptions}
        name="name"
        label="Select AcademicDepertMent"
        disabled={isLoading}
      ></MHSelect>
      <Button htmlType="submit">Submit</Button>
    </MHForm>
  );
};

export default CreateAcademicDepartment;
