"use client"

import {RiAddCircleFill} from "react-icons/ri"

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WorkspaceAvatar } from "@/features/workspaces/components/workpace-avatar";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspaceId";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspaces-modal";

interface WorkspaceProps {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: string[]; 
    $updatedAt: string; 
    imageUrl: string; 
    inviteCode: string;
    name: string;
    userId: string;
  }
  
const WorkspaceSwitcher = () => {
    const router = useRouter();
    const workspaceId = useWorkspaceId()
    const {data: workspaces} = useGetWorkspaces()
    const {open} = useCreateWorkspaceModal()

    const onSelect = (id:string) => {
        router.push(`/workspaces/${id}`)
        return
    }
    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-neutral-500">Workspaces</p>
                <RiAddCircleFill onClick={open} className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"/>
            </div>
            <Select onValueChange={onSelect} value={workspaceId} >
            <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
                <SelectValue placeholder="No workspace selected"/>
            </SelectTrigger>
            <SelectContent>
                {workspaces?.documents?.map((workspace: WorkspaceProps) => (
                    <SelectItem key={workspace.$id} value={workspace.$id}>
                        {/* {console.log(workspace)} */}
                        <div className="flex justify-start items-center gap-3 font-medium">
                            <WorkspaceAvatar name={workspace.name} image={workspace.imageUrl} />
                            <span className="truncate">{workspace.name}</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
            </Select>
        </div>
    );
};

export default WorkspaceSwitcher;