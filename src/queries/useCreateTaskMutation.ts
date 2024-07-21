import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import { TaskFormOutput } from "../pages/home/TaskFormModal";
import { postRequest } from "../utils/request";
import { TASK_ENDPOINT } from "../constants";
import { Task } from "../interfaces/Task";
import { Response } from "../interfaces/Response";
import keys from "./keys";


export function useCreateTaskMutation(): UseMutationResult<void, Error, TaskFormOutput> {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (task: TaskFormOutput) => {
            await postRequest<Response<Task>>(TASK_ENDPOINT.CREATE,task)
            await queryClient.invalidateQueries(keys.tasks)
        }
    })
}