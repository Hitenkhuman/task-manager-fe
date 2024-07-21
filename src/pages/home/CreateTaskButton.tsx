import React from "react";
import TaskFormModal, { TaskFormOutput } from "./TaskFormModal";
import { Button } from "../../components/buttons/Button";
import { useCreateTaskMutation } from "../../queries/useCreateTaskMutation";
import { toast } from "react-toastify";

export function CreateTaskButton(): React.JSX.Element {
  const [showModal, setShowModal] = React.useState(false);
  const createTaskMutation = useCreateTaskMutation();

  const onSubmit = (data: TaskFormOutput) => {
    createTaskMutation.mutate(data, {
      onSuccess: () => {
        setShowModal(false);
        toast.success("Task created successfully");
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
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
}
