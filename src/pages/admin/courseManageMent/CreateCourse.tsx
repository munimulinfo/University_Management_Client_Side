import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/featuers/admin/courseManagement.Api";
import MHForm from "../../../Components/form/MHForm";
import MHInput from "../../../Components/form/MHInput";
import MHSelect from "../../../Components/form/MHSelect";

const CreateCourse = () => {
  const [createCourse] = useAddCourseMutation();
  const { data: courses } = useGetAllCoursesQuery(undefined);

  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses
        ? data.preRequisiteCourses?.map((item: string) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    console.log(courseData);

    try {
      const res = (await createCourse(courseData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created", { id: toastId, duration: 2000 });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <MHForm onSubmit={onSubmit}>
          <MHInput type="text" name="title" label="Title" />
          <MHInput type="text" name="prefix" label="Prefix" />
          <MHInput type="text" name="code" label="Code" />
          <MHInput type="text" name="credits" label="Credits" />
          <MHSelect
            mode="multiple"
            options={preRequisiteCoursesOptions}
            name="preRequisiteCourses"
            label="preRequisiteCourses"
          />
          <Button htmlType="submit">Submit</Button>
        </MHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
