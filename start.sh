#!/bin/sh
export DISPLAY=:0
forever start -l mirrorConsole.log -a --uid "mirrorServer" -w server.js
