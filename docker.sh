#!/usr/bin/env bash
docker run --name statusbarcontainer -d -p 80:8000 statusbarimg

build(){
    docker build -t app.dmg .
}

start(){
    docker run --name statusbarcontainer -d -p 80:8000 statusbarimg
}


cmdList=( "build" "start" "exit" )

OPTION=$(${window} --title "Docker Menu Dialog" --menu "Choose your option" 10 60 4 \
"0" "just build" \
"1" "just run" \
"2" "exit"  3>&1 1>&2 2>&3)

exitStatus=$?
if [ ${exitStatus} = 0 ]; then
    echo "Your chosen option: #${OPTION} - ${cmdList[OPTION]}"
    ${cmdList[OPTION]}
else
    echo "You chose Cancel."
fi
exit 0
