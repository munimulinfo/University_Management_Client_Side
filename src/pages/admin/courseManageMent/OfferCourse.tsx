import { Button, Col, Flex } from "antd";

import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAcademicFacultiesQuery } from "../../../redux/featuers/admin/academicManagement.Api";
import MHForm from "../../../Components/form/MHForm";
import MHSelectWithWatch from "../../../Components/form/MHSelectWithWatch";
import MHInput from "../../../Components/form/MHInput";

const OfferCourse = () => {
  const [id, setId] = useState("");

  console.log("Inside parent component", id);

  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);

  const academicSemesterOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <MHForm onSubmit={onSubmit}>
          <MHSelectWithWatch
            mode="multiple"
            onValueChange={setId}
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <MHInput disabled={!id} type="text" name="test" label="Test" />
          <Button htmlType="submit">Submit</Button>
        </MHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
