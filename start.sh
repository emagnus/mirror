#!/bin/sh
forever start -l mirrorConsole.log -a --uid "mirrorServer" -w server.js
