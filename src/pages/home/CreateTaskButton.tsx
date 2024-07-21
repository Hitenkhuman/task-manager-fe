import React from "react";
import { TaskFormOutput, TaskFormModal } from "./TaskFormModal";
import { Button } from "../../components/buttons/Button";
import { useCreateTaskMutation } from "../../queries/useCreateTaskMutation";
import { toast } from "react-toastify";
import keys from "../../queries/keys";
import { useQueryClient } from "react-query";

export const CreateTaskButton: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);
  const createTaskMutation = useCreateTaskMutation();
  const queryClient = useQueryClient()

  const onSubmit = (data: TaskFormOutput) => {
    createTaskMutation.mutate(data, {
      onSuccess: () => {
        setShowModal(false);
        toast.success("Task created successfully");
        queryClient.invalidateQueries(keys.tasks)
      },
      onError: (error: any) => {
        if (error?.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error?.message ?? "Failed to create task");
        }
      },
    });
  };
  return (
    <div className="mb-4">
      <Button onClick={() => setShowModal(true)}>Add Task</Button>
      {showModal && (
        <TaskFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};
