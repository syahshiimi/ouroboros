#!/usr/bin/env bash

sleep 10

# Disable xset blankingx
xset s noblank
xset s off

# Hide the mouse cursor.
unclutter -idle 1 -root &

# Let Chromium think it always exited cleanly.
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' '~/.config/chromium/Default/Preferences'
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' '~/.config/chromium/Default/Preferences'

#firefox --kiosk 'https://ouroboros-forecaster.vercel.app/rainfall' &
chromium-browser --kiosk --noerrdialogs --disable-infobars 'https://ouroboros-forecaster.vercel.app/rainfall' &
