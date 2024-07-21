import { UseMutationResult, useMutation } from "react-query";
import { deleteRequest } from "../utils/request";
import { TASK_ENDPOINT } from "../constants";
import { Task } from "../interfaces/Task";
import { Response } from "../interfaces/Response";

type DeleteTaskRequest = {
    id: string
}

export function useDeleteTaskMutation(): UseMutationResult<void, Error, DeleteTaskRequest> {

    return useMutation({
        mutationFn: async (task: DeleteTaskRequest) => {
            await deleteRequest<Response<Task>>(`${TASK_ENDPOINT.DELETE}/${task.id}`)
        }
    })
}