import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { TaskList } from "../../components/taskList/TaskList";
import { CreateTaskButton } from "./CreateTaskButton";
import { Task } from "../../interfaces/Task";
import { TaskFormOutput, TaskFormModal } from "./TaskFormModal";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { ViewModal } from "../../components/modals/ViewModal";
import { useUpdateTaskMutation } from "../../queries/useUpdateTaskMutation";
import { useDeleteTaskMutation } from "../../queries/useDeleteTaskMutation";
import { toast } from "react-toastify";
import { useTaskStatusMutation } from "../../queries/useTaskStatusMutation";

export type TaskBoardData = {
  [key: string]: Task[];
};

type TaskPageProps = {
  board: TaskBoardData;
};

export const TaskPage: React.FC<TaskPageProps> = ({
  board,
}: Readonly<TaskPageProps>) => {
  const [tasks, setTasks] = React.useState<TaskBoardData>(board);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showViewModal, setShowViewModal] = React.useState(false);

  const updateTaskMutation = useUpdateTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();
  const taskStatusMutation = useTaskStatusMutation();

  const onDelete = (task: Task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const onUpdate = (task: Task) => {
    setSelectedTask(task);
    setShowUpdateModal(true);
  };

  const onViewTask = (task: Task) => {
    setShowViewModal(true);
    setSelectedTask(task);
  };

  const onClose = () => {
    setShowUpdateModal(false);
    setShowDeleteModal(false);
    setShowViewModal(false);
    setSelectedTask(null);
  };

  const onUpdateSubmit = (data: TaskFormOutput) => {
    updateTaskMutation.mutate(
      { ...data, id: selectedTask!._id },
      {
        onSuccess: () => {
          onClose();
          toast.success("Task updated successfully");
        },
        onError: (error: any) => {
          if (error?.response?.data?.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error(error?.message ?? "Failed to update task");
          }
        },
      }
    );
  };

  const deleteTask = () => {
    deleteTaskMutation.mutate(
      {
        id: selectedTask!._id,
      },
      {
        onSuccess: () => {
          onClose();
          toast.success("Task deleted successfully");
        },
        onError: (error: any) => {
          if (error?.response?.data?.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error(error?.message ?? "Failed to delete task");
          }
        },
      }
    );
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = tasks[source.droppableId];
    const finish = tasks[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start);
      const draggedTask = newTaskIds.splice(source.index, 1)[0];
      newTaskIds.splice(destination.index, 0, draggedTask);

      const newColumn = {
        id: source.droppableId,
        tasks: newTaskIds,
      };

      setTasks({
        ...tasks,
        [newColumn.id]: newColumn.tasks,
      });
    } else {
      const startTaskIds = Array.from(start);
      const draggedTask = startTaskIds.splice(source.index, 1)[0];
      const newStart = {
        id: source.droppableId,
        tasks: startTaskIds,
      };

      const finishTaskIds = Array.from(finish);
      finishTaskIds.splice(destination.index, 0, draggedTask);
      const newFinish = {
        id: destination.droppableId,
        tasks: finishTaskIds,
      };

      setTasks({
        ...tasks,
        [newStart.id]: newStart.tasks,
        [newFinish.id]: newFinish.tasks,
      });

      taskStatusMutation.mutate(
        {
          id: draggableId,
          status: destination.droppableId,
          prevTaskId: finishTaskIds[destination.index - 1]?._id,
        },
        {
          onError: (error: any) => {
            if (error?.response?.data?.message) {
              toast.error(error.response.data.message);
            } else {
              toast.error(error?.message ?? "Failed to save changes..");
            }
          },
        }
      );
    }
  };

  return (
    <>
      <div className="p-4">
        <CreateTaskButton />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4`}>
            {Object.entries(tasks).map(([status, tasks]) => (
              <TaskList
                status={status}
                tasks={tasks}
                key={status}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onView={onViewTask}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
      {showUpdateModal && (
        <TaskFormModal
          isOpen={showUpdateModal}
          onClose={onClose}
          onSubmit={onUpdateSubmit}
          task={selectedTask!}
        />
      )}
      {showDeleteModal && (
        <ConfirmModal
          message="Are you sure you want to delete this task?"
          title="Delete Task"
          isOpen={showDeleteModal}
          onClose={onClose}
          onConfirm={deleteTask}
        />
      )}
      {showViewModal && (
        <ViewModal
          isOpen={showViewModal}
          onClose={onClose}
          title="Task details"
          body={
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {selectedTask?.title}
              </h2>
              <p className="text-gray-600 overflow-hidden overflow-ellipsis break-words">
                {selectedTask?.description}
              </p>
              <div className="mt-2">
                <span className="text-gray-400 text-sm">
                  Created at: {selectedTask?.createdAt}
                </span>
              </div>
            </div>
          }
        />
      )}
    </>
  );
};
