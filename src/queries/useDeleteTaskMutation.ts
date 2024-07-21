import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import { deleteRequest } from "../utils/request";
import { TASK_ENDPOINT } from "../constants";
import { Task } from "../interfaces/Task";
import { Response } from "../interfaces/Response";
import keys from "./keys";

type DeleteTaskRequest = {
    id: string
}

export function useDeleteTaskMutation(): UseMutationResult<void, Error, DeleteTaskRequest> {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (task: DeleteTaskRequest) => {
            await deleteRequest<Response<Task>>(`${TASK_ENDPOINT.DELETE}/${task.id}`)
            await queryClient.invalidateQueries(keys.tasks)
        }
    })
}