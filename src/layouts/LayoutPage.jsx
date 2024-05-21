import Sidebar from "@/components/Sidebar";
import Header from "@/modules/dashboard/components/Header";

export default function LayoutPage({ children }) {
  return (
    <div className="h-[100vh] flex w-[100%] ]">
      <Sidebar />
      <div
        style={{
          marginLeft: "256px",
          padding: "40px 40px",
        }}
        className="ml-[256px] h-full w-full "
      >
        <Header />
        {children}
      </div>
    </div>
  );
}
