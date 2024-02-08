import { useGetAcademicDepartmentsQuery } from "../../../redux/featuers/admin/academicManagement.Api";

const AcademicDepartment = () => {
  const { data, isLoading } = useGetAcademicDepartmentsQuery(undefined);
  console.log(data, isLoading);

  return <div>academic depert ment</div>;
};

export default AcademicDepartment;
