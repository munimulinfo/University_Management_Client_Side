import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../redux/featuers/admin/userManagement.Api";
import { Table, TableColumnsType } from "antd";
import { TStudent } from "../../../types";

export type TTableData = Pick<
  TStudent,
  "fullName" | "id" | "email" | "contactNo"
>;
const StudentDetails = () => {
  const { studentId } = useParams();
  const { data: studentDetails, isFetching } =
    useGetSingleStudentQuery(studentId);
  console.log(studentDetails);

  const student = studentDetails?.data as TStudent;
  const dataSourceWithKeys = student ? [{ ...student, key: student.id }] : [];

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "fullName",
      dataIndex: "fullName",
    },

    {
      title: "Roll No.",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No.",
      key: "contactNo",
      dataIndex: "contactNo",
    },
  ];

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={dataSourceWithKeys}
      pagination={false}
    />
  );
};

export default StudentDetails;
