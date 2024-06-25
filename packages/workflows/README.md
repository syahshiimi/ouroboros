# Temporal Workflows project

The workflow definitions for the ouroboros project.

The package is a temporal project package that defines the workflows we want to import in a separate applications. By doing so, we decouple the business logic stored as _activities_ into packages that are modular. These modular workflows can be imported as packages by clients that require to use them, interfacing _only_ when necessary.
