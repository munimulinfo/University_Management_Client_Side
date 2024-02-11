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
import {
  useGetSingleAcademicSemesterQuery,
  useUpdateAcademicSemesterMutation,
} from "../../../redux/featuers/admin/academicManagement.Api";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const UpdateAcademicSemester = () => {
  const { semisterId } = useParams();
  const [updateAcademicSemester] = useUpdateAcademicSemesterMutation();
  const { data: semester, isLoading } =
    useGetSingleAcademicSemesterQuery(semisterId);
  if (isLoading) {
    return <p>Loding.....</p>;
  }

  const defaultValues = {
    endMonth: semester?.data?.endMonth,
    name: semester?.data?.name,
    startMonth: semester?.data?.startMonth,
    year: semester?.data?.year,
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updeting....");
    const name = semesterOptions[Number(data?.name) - 1]?.label;
    const semesterUpdateData = {
      id: semisterId,
      data: {
        name: name ? name : data?.name,
        code: name ? data.name : semester?.data?.code,
        year: data.year,
        startMonth: data.startMonth,
        endMonth: data.endMonth,
      },
    };
    try {
      const res = (await updateAcademicSemester(
        semesterUpdateData
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
            defaultValues={defaultValues}
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

export default UpdateAcademicSemester;
