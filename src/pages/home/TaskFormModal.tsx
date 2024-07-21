import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormModal from "../../components/modals/FormModal";
import { Task } from "../../interfaces/Task";

const taskSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
});

export type TaskFormOutput = z.output<typeof taskSchema>;

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormOutput) => void;
  task?: Task;
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  task,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      description: task?.description ?? "",
      title: task?.title ?? "",
    },
  });

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={task ? "Edit Task" : "Create Task"}
    >
      <>
        <div className="my-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            {...register("title")}
          />
          {errors.title && (
            <span className="text-red-500 text-xs">{errors.title.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Description"
            {...register("description")}
            rows={5}
          />
          {errors.description && (
            <span className="text-red-500 text-xs">
              {errors.description.message}
            </span>
          )}
        </div>
      </>
    </FormModal>
  );
};
