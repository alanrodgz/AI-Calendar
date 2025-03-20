#!/bin/bash

# Define the starting port and the number of ports to clean
START_PORT=3000
NUM_PORTS=16

echo "Cleaning ports from $START_PORT to $((START_PORT + NUM_PORTS - 1))..."

for ((i=0; i<NUM_PORTS; i++)); do
    PORT=$((START_PORT + i))
    
    # Find process using the port
    PID=$(lsof -ti :$PORT)
    
    if [ -n "$PID" ]; then
        echo "Killing process $PID using port $PORT..."
        kill -9 $PID
    else
        echo "No process found on port $PORT."
    fi
done

echo "Port cleanup complete."
