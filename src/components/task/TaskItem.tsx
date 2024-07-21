import { Draggable } from "react-beautiful-dnd";
import editIcon from "../../assets/icons/editIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import viewIcon from "../../assets/icons/viewIcon.svg";
import Tooltip from "../tooltips/Tooltip";
import { Task } from "../../interfaces/Task";

interface TaskItemProps {
  task: Task;
  index: number;
  onUpdate: (task: Task) => void;
  onDelete: (task: Task) => void;
  onView: (task: Task) => void;
}

export const TaskItem = ({
  task,
  index,
  onUpdate,
  onDelete,
  onView,
}: Readonly<TaskItemProps>) => (
  <Draggable key={task._id} draggableId={task._id} index={index}>
    {(provided, snapshot) => (
      <div
        className={`p-4 mb-2 rounded shadow-lg bg-white ${
          snapshot.isDragging ? "bg-blue-50" : ""
        } select-none`}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        key={task._id}
      >
        <div className="flex flex-col space-y-2">
          <div>
            <p className="text-lg font-semibold">{task.title}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 overflow-hidden text-ellipsis">
              {task.description}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs text-gray-400">{task.createdAt}</span>
            </div>
            <div className="flex gap-x-2">
              <div
                className="w-5 h-5 cursor-pointer"
                onClick={() => onView(task)}
                tabIndex={0}
                onKeyPress={(event) => event.key === "Enter" && onView(task)}
              >
                <Tooltip id="view" title="View task">
                  <img src={viewIcon} alt="view-task-icon" />
                </Tooltip>
              </div>
              <div
                className="w-5 h-5 cursor-pointer"
                onClick={() => onUpdate(task)}
                tabIndex={0}
                onKeyPress={(event) => event.key === "Enter" && onUpdate(task)}
              >
                <Tooltip id="edit" title="Edit task">
                  <img src={editIcon} alt="edit-task-icon" />
                </Tooltip>
              </div>
              <div
                className="w-5 h-5 cursor-pointer"
                onClick={() => onDelete(task)}
                tabIndex={0}
                onKeyPress={(event) => event.key === "Enter" && onDelete(task)}
              >
                <Tooltip id="delete" title="Delete task">
                  <img src={deleteIcon} alt="delete-task-icon" />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </Draggable>
);
