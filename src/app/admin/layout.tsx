import ASidebar from "@/components/admin/layout/ASidebar";
import ATopbar from "@/components/admin/layout/ATopbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-svh bg-slate-800">
      <ATopbar />
      <div className="grid flex-1 lg:grid-cols-[220px_1fr]">
        <div className="max-lg:hidden">
          <ASidebar />
        </div>

        <main className="h-[calc(100svh-59px)] bg-slate-100 @container lg:rounded-tl-xl">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
