import { getCurrent } from '@/features/auth/queries';
import EditProjectForm from '@/features/projects/components/edit-project-form';
import { getProject } from '@/features/projects/queries';
import { redirect } from 'next/navigation';
import React from 'react';


interface ProjectIdSettingsProps {
    params: {
        projectId: string;
    }
}

const ProjectSettings = async ({params}:ProjectIdSettingsProps) => {

    const user = await getCurrent();
    if(!user) redirect("/sign-in")

    const initialValues = await getProject({
        projectId: params.projectId
    })

    return (
        <div className='w-full lg:max-w-xl'>
            <EditProjectForm initialValues={initialValues}/>
        </div>
    );
};

export default ProjectSettings;