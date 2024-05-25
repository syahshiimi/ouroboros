import { topics } from "./queue"

export type WorkflowInput = {
    date: string
    topic:  keyof typeof topics
  }