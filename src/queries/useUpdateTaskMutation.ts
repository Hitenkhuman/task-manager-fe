import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import { TaskFormOutput } from "../pages/home/TaskFormModal";
import {  putRequest } from "../utils/request";
import { TASK_ENDPOINT } from "../constants";
import { Task } from "../interfaces/Task";
import { Response } from "../interfaces/Response";
import keys from "./keys";

type UpdateTaskRequest = TaskFormOutput & {id: string}

export function useUpdateTaskMutation(): UseMutationResult<void, Error, UpdateTaskRequest> {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (task: UpdateTaskRequest) => {
            await putRequest<Response<Task>>(`${TASK_ENDPOINT.UPDATE}/${task.id}`,task)
            await queryClient.invalidateQueries(keys.tasks)
        }
    })
}