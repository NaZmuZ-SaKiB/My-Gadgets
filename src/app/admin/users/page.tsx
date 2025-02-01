import UsersData from "./_components/UsersData";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import APageContainer from "@/components/admin/admin-ui/APageContainer";

const AllUsersPage = () => {
  return (
    <APageContainer>
      <APageHeading title="Users" />

      <UsersData />
    </APageContainer>
  );
};

export default AllUsersPage;
