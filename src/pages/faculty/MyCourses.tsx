import { Button, Col, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAllFacultyCoursesQuery } from "../../redux/featuers/faculty/facultyCourseManagement.Api";
import MHForm from "../../Components/form/MHForm";
import MHSelect from "../../Components/form/MHSelect";

const MyCourses = () => {
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery(undefined);
  const navigate = useNavigate();
  const semesterOptions = facultyCoursesData?.data?.map((item: any) => ({
    label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    value: item.semesterRegistration._id,
  }));

  const courseOptions = facultyCoursesData?.data?.map((item: any) => ({
    label: item.course.title,
    value: item.course._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <MHForm onSubmit={onSubmit}>
          <MHSelect
            options={semesterOptions}
            name="semesterRegistration"
            label="Semester"
          />
          <MHSelect options={courseOptions} name="course" label="Course" />
          <Button htmlType="submit">Submit</Button>
        </MHForm>
      </Col>
    </Flex>
  );
};

export default MyCourses;
