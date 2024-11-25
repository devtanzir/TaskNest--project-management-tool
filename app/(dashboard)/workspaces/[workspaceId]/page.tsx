import { getCurrent } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import React from 'react';

const WorkspaceId = async () => {
    const user = await getCurrent();
    if(!user) redirect("/sign-in")
    return (
        <div>
            this is workspace id
        </div>
    );
};

export default WorkspaceId;