import { topicsStore } from "./queue"

export type WorkflowInput = {
    date: string
    topic:  keyof typeof topicsStore
  }