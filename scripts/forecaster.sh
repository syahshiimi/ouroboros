#!/usr/bin/env bash

sleep 10

# Hide the mouse cursor.
unclutter -idle 1 -root &

# Let Chromium think it always exited cleanly.
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' '~/.config/chromium/Default/Preferences'
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' '~/.config/chromium/Default/Preferences'

# Start Chromium.
chromium-browser --kiosk --noerrdialogs --disable-infobars 'https://ouroboros-forecaster.vercel.app/rainfall' &
