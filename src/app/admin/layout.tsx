import ASidebar from "@/components/admin/layout/ASidebar";
import ATopbar from "@/components/admin/layout/ATopbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-svh bg-slate-800">
      <ATopbar />
      <div className="grid grid-cols-[220px_1fr] flex-1">
        <ASidebar />

        <main className="h-[calc(100svh-60px)] bg-slate-100 rounded-lg rounded-tr-none rounded-bl-none">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
