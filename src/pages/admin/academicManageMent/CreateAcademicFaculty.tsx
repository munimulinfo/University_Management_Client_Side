import MHForm from "../../../Components/form/MHForm";
import { SubmitHandler, FieldValues } from "react-hook-form";
import MHInput from "../../../Components/form/MHInput";
import { Button } from "antd";
import { useAddAcademicFacultyMutation } from "../../../redux/featuers/admin/academicManagement.Api";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty, { data, error }] = useAddAcademicFacultyMutation();
  console.log(error, data);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const academicFaculty = {
      name: data?.name,
    };
    addAcademicFaculty(academicFaculty);
  };
  return (
    <MHForm onSubmit={onSubmit} resolver={zodResolver(academicFacultySchema)}>
      <MHInput
        type="text"
        name="name"
        label="Name Of Academic Faculty"
      ></MHInput>
      <Button htmlType="submit">Submit</Button>
    </MHForm>
  );
};

export default CreateAcademicFaculty;
