#!/bin/bash

# A simple command that can be ran on the pi4 devices for `agents-merchants` in an automated way. 

run_commands() {
  cd agents-merchants || return
  docker compose up
  exec bash
}

# Export the function so it's available to the new terminal session
export -f run_commands

# Open mate-terminal in full screen and run our commands
mate-terminal --maximize --command="bash -c run_commands"
