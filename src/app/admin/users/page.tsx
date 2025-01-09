import APageContainer from "@/components/admin/admin-ui/APageContainer";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import UsersData from "./_components/UsersData";

const AllUsersPage = () => {
  return (
    <APageContainer>
      <APageHeading title="Users" />

      <UsersData />
    </APageContainer>
  );
};

export default AllUsersPage;
