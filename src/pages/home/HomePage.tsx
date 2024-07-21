import 'react-loading-skeleton/dist/skeleton.css'
import { useMemo } from "react";
import { useTasksQuery } from "../../queries/useTasksQuery";
import { TaskBoardData, TaskPage } from "./TaskPage";
import { TASK_STATUS } from "../../constants";
import Skeleton from "react-loading-skeleton";

export const HomePage: React.FC = () => {
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
};
