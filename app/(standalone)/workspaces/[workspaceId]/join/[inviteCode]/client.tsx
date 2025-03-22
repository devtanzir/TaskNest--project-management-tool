"use client"

import PageError from "@/components/shared/page-error";
import PageLoader from "@/components/shared/page-loader";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import JoinWorkspaceForm from "@/features/workspaces/components/join-workspace-form";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspaceId";

const WorkspaceIdJoinClient = () => {
      const workspaceId = useWorkspaceId();
            const { data: initialValues, isLoading } = useGetWorkspaceInfo({ workspaceId });
            if (isLoading) {
                return <PageLoader/>
            }
            if (!initialValues) {
                return <PageError message="Workspace info not found"/>
            }
    return (
        <div className="w-full lg:max-w-xl">
            <JoinWorkspaceForm initialValues={initialValues}/>
        </div>
    );
};

export default WorkspaceIdJoinClient;