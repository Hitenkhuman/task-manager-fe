import { UseMutationResult, useMutation } from "react-query";
import { TaskFormOutput } from "../pages/home/TaskFormModal";
import { postRequest } from "../utils/request";
import { TASK_ENDPOINT } from "../constants";
import { Task } from "../interfaces/Task";
import { Response } from "../interfaces/Response";


export function useCreateTaskMutation(): UseMutationResult<void, Error, TaskFormOutput> {

    return useMutation({
        mutationFn: async (task: TaskFormOutput) => {
            await postRequest<Response<Task>>(TASK_ENDPOINT.CREATE,task)
        }
    })
}