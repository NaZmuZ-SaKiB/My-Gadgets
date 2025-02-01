import { Metadata } from "next";

import FloatingCompareButton from "@/components/global/shared/FloatingCompareButton";
import AdminTopbar from "@/components/global/layout/admin-topbar/AdminTopbar";
import MobileBottombar from "@/components/global/layout/MobileBottombar";
import BreadcrumbBar from "@/components/global/shared/Breadcrumb";
import Footer from "../../../components/global/layout/footer/Footer";
import Header from "@/components/global/layout/header/Header";
import AccountSidebar from "./_components/AccountSidebar";

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
