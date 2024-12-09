"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DottedSeparator from "@/components/shared/dotted-separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspaceId";
import { createTasksSchema } from "../schemas";
import { useCreateTask } from "../api/use-create-task";
import DatePicker from "@/components/shared/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MemberAvatar } from "@/features/members/components/memberAvatar";
import { TaskStatus } from "../types";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

interface CreateTaskFromProps {
  onCancel?: () => void;
  projectOptions: {id: string, name: string, imageUrl: string}[],
  memberOptions: {id: string, name: string}[],
}
const CreateTaskForm = ({ onCancel,projectOptions, memberOptions }: CreateTaskFromProps) => {
  const workspaceId = useWorkspaceId()
  const { mutate, isPending } = useCreateTask();

  const form = useForm<z.infer<typeof createTasksSchema>>({
    resolver: zodResolver(createTasksSchema.omit({workspaceId: true})),
    defaultValues: {
      workspaceId,
    },
  });

  const onSubmit = (values: z.infer<typeof createTasksSchema>) => {

    mutate({ json: {...values,workspaceId}  }, {
      onSuccess: () => {
        form.reset()
        // TODO: Redirect to new tasks
      },
    });
  };


  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Create a new task
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="name"
                        placeholder="Enter task name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="dueDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                     <DatePicker {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="assigneeId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignee</FormLabel>
                    <Select defaultValue={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select assignee"/>
                        </SelectTrigger>
                      </FormControl>
                    <FormMessage />
                    <SelectContent>
                      {memberOptions.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          <div className="flex items-center gap-x-2">
                            <MemberAvatar
                            className="size-6"
                            name={member.name}/>
                            {member.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="status"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select defaultValue={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status"/>
                        </SelectTrigger>
                      </FormControl>
                    <FormMessage />
                    <SelectContent>
                    <SelectItem value={TaskStatus.BACKLOG}>
                        Backlog
                    </SelectItem>
                    <SelectItem value={TaskStatus.IN_PROGRESS}>
                        In Progress
                    </SelectItem>
                    <SelectItem value={TaskStatus.IN_REVIEW}>
                        In Review
                    </SelectItem>
                    <SelectItem value={TaskStatus.TODO}>
                        Todo
                    </SelectItem>
                    <SelectItem value={TaskStatus.DONE}>
                        Done
                    </SelectItem>
                    </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="projectId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <Select defaultValue={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Project"/>
                        </SelectTrigger>
                      </FormControl>
                    <FormMessage />
                    <SelectContent>
                      {projectOptions.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          <div className="flex items-center gap-x-2">
                            <ProjectAvatar
                            className="size-6"
                            name={project.name}
                            image={project.imageUrl}/>
                            {project.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

            </div>
            <DottedSeparator className="py-7" />
            <div className="flex items-center justify-between">
              <Button
                type="button"
                size={"lg"}
                variant={"secondary"}
                onClick={onCancel}
                disabled={isPending}
                className={cn(!onCancel && "invisible")}
              >
                Cancel
              </Button>
              <Button type="submit" size={"lg"} disabled={isPending}>
                Create Task
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateTaskForm;
