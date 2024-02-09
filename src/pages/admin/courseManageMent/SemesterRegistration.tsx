import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import { semesterStatusOptions } from "../../../constants/semester";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { useAddRegisteredSemesterMutation } from "../../../redux/featuers/admin/courseManagement.Api";
import MHForm from "../../../Components/form/MHForm";
import MHSelect from "../../../Components/form/MHSelect";
import MHDatePicker from "../../../Components/form/MHDatePicker";
import MHInput from "../../../Components/form/MHInput";
import { useGetAllAcademicSemesterQuery } from "../../../redux/featuers/admin/academicManagement.Api";
const SemesterRegistration = () => {
  const [addSemester] = useAddRegisteredSemesterMutation();
  const { data: academicSemester } = useGetAllAcademicSemesterQuery([
    { name: "sort", value: "year" },
  ]);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  console.log(academicSemesterOptions);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    console.log(semesterData);

    try {
      const res = (await addSemester(semesterData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <MHForm onSubmit={onSubmit}>
          <MHSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />

          <MHSelect
            name="status"
            label="Status"
            options={semesterStatusOptions}
          />
          <MHDatePicker name="startDate" label="Start Date" />
          <MHDatePicker name="endDate" label="End Date" />
          <MHInput type="text" name="minCredit" label="Min Credit" />
          <MHInput type="text" name="maxCredit" label="Max Credit" />

          <Button htmlType="submit">Submit</Button>
        </MHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
