import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import moment from "moment";

import { weekDaysOptions } from "../../../constants/global";
import MHTimePicker from "../../../Components/form/MHTimePicker";
import MHForm from "../../../Components/form/MHForm";
import MHSelect from "../../../Components/form/MHSelect";
import MHSelectWithWatch from "../../../Components/form/MHSelectWithWatch";
import MHInput from "../../../Components/form/MHInput";
import {
  useCreateOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/featuers/admin/courseManagement.Api";
import {
  useGetAcademicDepartmentsQuery,
  useGetAcademicFacultiesQuery,
} from "../../../redux/featuers/admin/academicManagement.Api";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");

  const [addOfferedCourse] = useCreateOfferedCourseMutation();

  const { data: semesterRegistrationData } = useGetAllRegisteredSemestersQuery([
    { name: "sort", value: "year" },
    { name: "status", value: "UPCOMING" },
  ]);

  console.log(semesterRegistrationData);

  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);

  const { data: academicDepartmentData } =
    useGetAcademicDepartmentsQuery(undefined);

  const { data: coursesData } = useGetAllCoursesQuery(undefined);

  const { data: facultiesData, isFetching: fetchingFaculties } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId });
  console.log(facultiesData);

  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item) => ({
      value: item._id,
      label: item.name,
    })
  );

  const courseOptions = coursesData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const facultiesOptions = facultiesData?.data?.faculties?.map((item: any) => ({
    value: item._id,
    label: item.fullName,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };

    const res = await addOfferedCourse(offeredCourseData);
    console.log(res);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <MHForm onSubmit={onSubmit}>
          <MHSelect
            name="semesterRegistration"
            label="Semester Registrations"
            options={semesterRegistrationOptions}
          />
          <MHSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={academicFacultyOptions}
          />
          <MHSelect
            name="academicDepartment"
            label="Academic Department"
            options={academicDepartmentOptions}
          />
          <MHSelectWithWatch
            onValueChange={setCourseId}
            options={courseOptions}
            name="course"
            label="Course"
          />
          <MHSelect
            disabled={!courseId || fetchingFaculties}
            name="faculty"
            label="Faculty"
            options={facultiesOptions}
          />
          <MHInput type="text" name="section" label="Section" />
          <MHInput type="text" name="maxCapacity" label="Max Capacity" />
          <MHSelect
            mode="multiple"
            options={weekDaysOptions}
            name="days"
            label="Days"
          />
          <MHTimePicker name="startTime" label="Start Time" />
          <MHTimePicker name="endTime" label="End Time" />

          <Button htmlType="submit">Submit</Button>
        </MHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
