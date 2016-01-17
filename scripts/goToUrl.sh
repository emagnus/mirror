#!/bin/bash

if [ -z "$1" ]
  then
    echo "Usage: "
    echo "endreUrl http://news.ycombinator.com"
    exit 1
fi

xdotool key alt+i
xdotool type "$1"
xdotool key Return
