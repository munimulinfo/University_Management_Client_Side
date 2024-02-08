import { Button, Col, Flex } from "antd";
import MHForm from "../../../Components/form/MHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import MHSelect from "../../../Components/form/MHSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { TResponse } from "../../../types/global";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { useAddAcademicSemesterMutation } from "../../../redux/featuers/admin/academicManagement.Api";
import { toast } from "sonner";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating....");
    const name = semesterOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      const res = (await addAcademicSemester(
        semesterData
      )) as TResponse<TAcademicSemester>;
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId, duration: 1000 });
      } else {
        toast.success(res?.data?.message, {
          id: toastId,
          duration: 1000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <div>
      <Flex justify={"center"} align={"center"}>
        <Col span={6}>
          <MHForm
            onSubmit={onSubmit}
            resolver={zodResolver(academicSemesterSchema)}
          >
            <MHSelect label="Name" name="name" options={semesterOptions} />
            <MHSelect label="Year" name="year" options={yearOptions} />
            <MHSelect
              label="Start Month"
              name="startMonth"
              options={monthOptions}
            />
            <MHSelect
              label="End Month"
              name="endMonth"
              options={monthOptions}
            />

            <Button htmlType="submit">Submit</Button>
          </MHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateAcademicSemester;
