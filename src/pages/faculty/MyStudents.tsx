import { useParams } from "react-router-dom";

import { Button, Modal, Table } from "antd";
import { useState } from "react";
import {
  useAddMarkMutation,
  useGetAllFacultyCoursesQuery,
} from "../../redux/featuers/faculty/facultyCourseManagement.Api";
import MHForm from "../../Components/form/MHForm";
import MHInput from "../../Components/form/MHInput";

type TFacultyCourseData = {
  _id: string;
  student: any;
  semesterRegistration: any;
  offeredCourse: any;
};

const MyStudents = () => {
  const { registerSemesterId, courseId } = useParams();
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery([
    { name: "semesterRegistration", value: registerSemesterId },
    { name: "course", value: courseId },
  ]);

  console.log(facultyCoursesData);

  const tableData = facultyCoursesData?.data?.map(
    ({
      _id,
      student,
      semesterRegistration,
      offeredCourse,
    }: TFacultyCourseData) => ({
      key: _id,
      name: student.fullName,
      roll: student.id,
      semesterRegistration: semesterRegistration._id,
      student: student._id,
      offeredCourse: offeredCourse._id,
    })
  );

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Roll",
      key: "roll",
      dataIndex: "roll",
    },
    {
      title: "Action",
      key: "x",
      render: (item: any) => {
        return (
          <div>
            <AddMarksModal studentInfo={item} />
          </div>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={tableData} />;
};

const AddMarksModal = ({ studentInfo }: { studentInfo: any }) => {
  console.log(studentInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMark] = useAddMarkMutation();

  const handleSubmit = async (data: any) => {
    const studentMark = {
      semesterRegistration: studentInfo.semesterRegistration,
      offeredCourse: studentInfo.offeredCourse,
      student: studentInfo.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        midTerm: Number(data.midTerm),
        classTest2: Number(data.classTest2),
        finalTerm: Number(data.finalTerm),
      },
    };

    console.log(studentMark);
    const res = await addMark(studentMark);

    console.log(res);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <MHForm onSubmit={handleSubmit}>
          <MHInput type="text" name="classTest1" label="Class Test 1" />
          <MHInput type="text" name="classTest2" label="Class Test 2" />
          <MHInput type="text" name="midTerm" label="Midterm" />
          <MHInput type="text" name="finalTerm" label="Final" />
          <Button htmlType="submit">Submit</Button>
        </MHForm>
      </Modal>
    </>
  );
};

export default MyStudents;
