import AdminTopbar from "@/components/global/layout/admin-topbar/AdminTopbar";
import Footer from "@/components/global/layout/footer/Footer";
import Header from "@/components/global/layout/header/Header";
import MobileBottombar from "@/components/global/layout/MobileBottombar";
import FloatingCompareButton from "@/components/global/shared/FloatingCompareButton";

const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <AdminTopbar />
      <Header />
      <div className="min-h-[50svh]">{children}</div>
      <FloatingCompareButton />
      <Footer />
      <MobileBottombar />
    </>
  );
};

export default UserLayout;
