import BreadcrumbBar from "@/components/global/shared/Breadcrumb";
import AccountSidebar from "./_components/AccountSidebar";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mg-container p-4">
      <BreadcrumbBar items={[{ label: "My Account" }]} />

      <div className="grid lg:grid-cols-[220px_1fr] mt-5">
        <AccountSidebar />
        <div className="p-2 sm:p-4">{children}</div>
      </div>
    </div>
  );
};

export default AccountLayout;
