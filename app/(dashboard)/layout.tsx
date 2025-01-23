import Sidebar from "@/app/(dashboard)/_components/sidebar";
import Navbar from "./_components/navbar";
import CreateWorkspacesModal from "@/features/workspaces/components/create-workspaces-modal";
import CreateProjectsModal from "@/features/projects/components/create-project-modal";
import CreateTaskModal from "@/features/tasks/components/create-task-modal";
import EditTaskModal from "@/features/tasks/components/edit-task-modal";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <CreateWorkspacesModal/>
      <CreateProjectsModal/>
      <CreateTaskModal/>
      <EditTaskModal/>
      <div className="flex w-full h-full">
        <div className="fixed lezft-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
            <Sidebar/>
        </div>
        <div className="lg:pl-[264px] w-full">
            <div className="mx-auto max-w-screen-2xl h-full">
                <Navbar/>
                <main className="h-full py-8 px-6 flex flex-col">
                    {children}
                </main>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
