import BreadcrumbBar from "@/components/global/shared/Breadcrumb";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mg-container p-4">
      <BreadcrumbBar items={[{ label: "My Account" }]} />
    </div>
  );
};

export default AccountLayout;
