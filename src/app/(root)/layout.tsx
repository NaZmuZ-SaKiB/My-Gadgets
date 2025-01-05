import AdminTopbar from "@/components/global/layout/admin-topbar/AdminTopbar";
import Footer from "@/components/global/layout/footer/Footer";
import Header from "@/components/global/layout/header/Header";

const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <AdminTopbar />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default UserLayout;
