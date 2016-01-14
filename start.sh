#!/bin/sh
forever start -l mirrorConsole.log -a --uid "mirrorServer" server.js
