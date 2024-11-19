"use client"
import ResponsiveModal from '@/components/shared/responsive-modal';
import React from 'react';
import CreateWorkspaceForm from './create-workspace-form';
import { useCreateWorkspaceModal } from '../hooks/use-create-workspaces-modal';

const CreateWorkspacesModal = () => {
    const {isOpen, setIsOpen, close} = useCreateWorkspaceModal()
    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateWorkspaceForm onCancel={close}/>
        </ResponsiveModal>
    );
};

export default CreateWorkspacesModal;