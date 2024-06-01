import { WorkflowClient } from "@temporalio/client";

/**
 * Instantiate a single object for global use here, following
 * the principles of a Singleton pattern.
 */
export const workflowBinderClient = new WorkflowClient()