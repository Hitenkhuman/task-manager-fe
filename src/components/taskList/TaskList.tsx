import { Droppable } from "react-beautiful-dnd";
import TaskItem from "../task/TaskItem";
import { Task } from "../../interfaces/Task";
import dayjs from "dayjs";

interface TaskListProps {
  status: string;
  tasks: Task[];
  onDelete: (task: Task) => void;
  onUpdate: (task: Task) => void;
  onView: (task: Task) => void;
}

const TaskList = ({
  status,
  tasks,
  onDelete,
  onUpdate,
  onView,
}: Readonly<TaskListProps>) => (
  <Droppable droppableId={status}>
    {(provided, snapshot) => (
      <div
        className={`bg-gray-200 p-4 rounded min-h-max ${
          snapshot.isDraggingOver ? "bg-gray-300" : ""
        }`}
        {...provided.droppableProps}
        ref={provided.innerRef}
      >
        <h2 className="font-bold mb-2 text-lg">{status.toUpperCase()}</h2>
        {tasks.map((task, index) => (
          <TaskItem
            task={{
              ...task,
              createdAt: dayjs(task.createdAt).format("DD/MM/YYYY, HH:mm:ss"),
            }}
            index={index}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onView={onView}
          />
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default TaskList;
