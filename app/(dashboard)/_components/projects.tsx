"use client"
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import { useCreateProjectModal } from '@/features/projects/hooks/use-create-project-modal';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspaceId';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiAddCircleFill } from 'react-icons/ri';

const Projects = () => {
    const projectId = null; // TODO: use the useProjectId hook
    const workspaceId = useWorkspaceId();
    const {data} = useGetProjects({ workspaceId });
    const pathname = usePathname()
    const {open} = useCreateProjectModal()
    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-neutral-500">Projects</p>
                <RiAddCircleFill onClick={open} className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"/>
            </div>
            {
                data?.documents?.map(doc => {
                    const href = `workspace/${workspaceId}/projects/${projectId}`
                    const isActive = pathname === href

                    return (
                        <Link href={href} key={doc.$id}>
                            <div className={cn("flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500", isActive && "bg-white shadow-sm hover:opacity-100 text-primary")}>
                                <ProjectAvatar image={doc.imageUrl} name={doc.name}/>
                                <span className='truncate'>{doc.name}</span>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    );
};

export default Projects;