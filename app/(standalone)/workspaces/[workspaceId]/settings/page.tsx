import { getWorkspace } from "@/features/workspaces/queries";
import { getCurrent } from "@/features/auth/queries";
import EditWorkspaceForm from "@/features/workspaces/components/edit-workspace-form";
import { redirect } from "next/navigation";

interface WorkspaceIdSettingProps {
    params: {
        workspaceId: string;
    }
}
const WorkspaceIdSettingsPage = async ({params}: WorkspaceIdSettingProps) => {
    const user = await getCurrent();
    if(!user) redirect("/sign-in")
        const initialValues = await getWorkspace({
    workspaceId: params.workspaceId,
 });
    return (
        <div className="w-full lg:max-w-xl">
            <EditWorkspaceForm initialValues={initialValues} />
        </div>
    );
};

export default WorkspaceIdSettingsPage;