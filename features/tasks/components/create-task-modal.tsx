"use client"
import React from 'react';
import { useCreateTaskModal } from '../hooks/use-create-tasks-modal';
import ResponsiveModal from '@/components/shared/responsive-modal';
import CreateTaskFormWrapper from './create-task-form-wrapper';

const CreateTaskModal = () => {
    const {isOpen, setIsOpen, close} = useCreateTaskModal()
    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateTaskFormWrapper onCancel={close}/>
        </ResponsiveModal>
    );
};

export default CreateTaskModal;