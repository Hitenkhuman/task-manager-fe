import { UseMutationResult, useMutation } from "react-query";
import {  patchRequest } from "../utils/request";
import { TASK_ENDPOINT } from "../constants";
import { Task } from "../interfaces/Task";
import { Response } from "../interfaces/Response";

type ChangeTaskStatusRequest = {
    id: string
    prevTaskId?: string
    status: string
}

export function useTaskStatusMutation(): UseMutationResult<void, Error, ChangeTaskStatusRequest> {

    return useMutation({
        mutationFn: async (task: ChangeTaskStatusRequest) => {
            await patchRequest<Response<Task>>(`${TASK_ENDPOINT.CHANGE_STATUS}/${task.id}`, task)
        }
    })
}