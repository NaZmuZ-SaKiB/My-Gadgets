import ASidebar from "@/components/admin/layout/ASidebar";
import ATopbar from "@/components/admin/layout/ATopbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-svh bg-slate-800">
      <ATopbar />
      <div className="grid lg:grid-cols-[220px_1fr] flex-1">
        <div className="max-lg:hidden">
          <ASidebar />
        </div>

        <main className="@container h-[calc(100svh-60px)] bg-slate-100 lg:rounded-tl-lg">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
