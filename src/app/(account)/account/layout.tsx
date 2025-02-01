import BreadcrumbBar from "@/components/global/shared/Breadcrumb";
import AccountSidebar from "./_components/AccountSidebar";
import AdminTopbar from "@/components/global/layout/admin-topbar/AdminTopbar";
import FloatingCompareButton from "@/components/global/shared/FloatingCompareButton";
import MobileBottombar from "@/components/global/layout/MobileBottombar";
import Footer from "@/components/global/layout/footer/Footer";
import Header from "@/components/global/layout/header/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "View and update your account details.",
};

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AdminTopbar />
      <Header />
      <div className="mg-container p-4">
        <BreadcrumbBar items={[{ label: "My Account" }]} />

        <div className="mt-5 grid gap-4 lg:grid-cols-[220px_1fr]">
          <AccountSidebar />

          <div className="overflow-x-auto">{children}</div>
        </div>
      </div>
      <FloatingCompareButton />
      <Footer />
      <MobileBottombar />
    </>
  );
};

export default AccountLayout;
