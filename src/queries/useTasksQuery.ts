import { UseQueryResult, useQuery } from "react-query";
import { Task } from "../interfaces/Task";
import keys from "./keys";
import { getRequest } from "../utils/request";
import { TASK_ENDPOINT } from "../constants";
import { Response } from "../interfaces/Response";

export function useTasksQuery(): UseQueryResult<Task[]> {
  return useQuery({
    queryKey: [keys.tasks],
    queryFn: async () => {
        const response = await getRequest<Response<Task[]>>(TASK_ENDPOINT.GET_ALL)
        return response.data;
    },
  })
}