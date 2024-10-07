#!/usr/bin/env bash

# Ensures crontab can spin up the chromium instance.
export DISPLAY=:0

sleep 10

# Disable xset blankingx
xset s noblank
xset s off

# Let Chromium think it always exited cleanly.
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' '~/.config/chromium/Default/Preferences'
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' '~/.config/chromium/Default/Preferences'

chromium-browser --kiosk --start-maximized --noerrdialogs --disable-infobars 'https://ouroboros-forecaster.vercel.app/rainfall'
