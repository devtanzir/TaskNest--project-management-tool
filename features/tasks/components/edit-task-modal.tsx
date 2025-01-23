"use client"
import React from 'react';
import ResponsiveModal from '@/components/shared/responsive-modal';
import { useEditTaskModal } from '../hooks/use-edit-tasks-modal';
import EditTaskFormWrapper from './edit-task-form-wrapper';

const EditTaskModal = () => {
    const {taskId, setTaskId, close} = useEditTaskModal()
    return (
        <ResponsiveModal open={!!taskId} onOpenChange={close}>
            {
                taskId && (
                    <EditTaskFormWrapper id={taskId} onCancel={close}/>
                )
            }
            
        </ResponsiveModal>
    );
};

export default EditTaskModal;