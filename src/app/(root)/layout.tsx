import Footer from "@/components/global/layout/Footer/Footer";
import Header from "@/components/global/layout/header/Header";

const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default UserLayout;
