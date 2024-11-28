"use client"
import ResponsiveModal from '@/components/shared/responsive-modal';
import React from 'react';
import { useCreateProjectModal } from '../hooks/use-create-project-modal';
import CreateProjectForm from './create-project-form';

const CreateProjectsModal = () => {
    const {isOpen, setIsOpen, close} = useCreateProjectModal()
    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateProjectForm onCancel={close}/>
        </ResponsiveModal>
    );
};

export default CreateProjectsModal;