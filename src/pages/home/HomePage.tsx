import React, { useMemo } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TaskList from "../../components/taskList/TaskList";
import { CreateTaskButton } from "./CreateTaskButton";
import { Task } from "../../interfaces/Task";
import TaskFormModal, { TaskFormOutput } from "./TaskFormModal";
import ConfirmModal from "../../components/modals/ConfirmModal";
import ViewModal from "../../components/modals/ViewModal";
import { useTasksQuery } from "../../queries/useTasksQuery";
import { useUpdateTaskMutation } from "../../queries/useUpdateTaskMutation";
import { useDeleteTaskMutation } from "../../queries/useDeleteTaskMutation";
import { toast } from "react-toastify";
import { TaskBoardData, TaskPage } from "./TaskPage";
import { TASK_STATUS } from "../../constants";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function HomePage() {
  const taskQUery = useTasksQuery();

  const boardData = useMemo(() => {
    return (taskQUery.data ?? []).reduce<TaskBoardData>(
      (acc, task) => {
        acc[task.status] = [...(acc[task.status] ?? []), task];
        return acc;
      },
      {
        [TASK_STATUS.TODO]: [],
        [TASK_STATUS.IN_PROGRESS]: [],
        [TASK_STATUS.DONE]: [],
      }
    );
  }, [taskQUery.data]);

  if (taskQUery.isError) {
    return <div>Error fetching tasks</div>;
  }

  if (taskQUery.isFetching) {
    return (
      <div>
        <Skeleton height={30} width={80} className="my-5 mx-5" />
        <Skeleton count={5} height={100} className="mt-5" />
      </div>
    );
  }

  return <TaskPage board={boardData} />;
}

export default HomePage;
