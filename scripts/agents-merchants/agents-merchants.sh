#!/bin/bash

# A simple command that can be ran on the pi4 devices for `agents-merchants` in an automated way. 

run_commands() {
  cd agents-merchants || return
  docker compose up
  # keep the terminal open
  exec bash
}

# Export the function so it's available to the new terminal session
export -f run_commands

# Open mate-terminal in full screen and run our commands
mate-terminal --maximize --command="bash -c run_commands" &

# Wait for terminal to open
sleep 5

# Use xdotool to find the opened mate-terminal
WINDOW_ID=$(xdotool search --pid $! --class "mate-terminal" | tail -n1)

# Activate the window and send F11 to toggle full-screen
xdotool windowactivate $WINDOW_ID
xdotool key F11
