#!/usr/bin/env bash
# author : owen-carter

declare window=whiptail
declare window=dialog
declare imageName="app.dmg"
declare containerName="spider-mzitu"
build(){
    docker build -t ${imageName} .
}

start(){
    docker run --name ${containerName} -d -p 80:8000 ${imageName}
}

remove(){
    docker rm ${containerName}
}


cmdList=( "build" "start" "remove" "exit" )

OPTION=$(${window} --title "Docker Menu Dialog" --menu "Choose your option" 10 60 4 \
"0" "just build" \
"1" "just run" \
"2" "just remove" \
"3" "exit"  3>&1 1>&2 2>&3)

exitStatus=$?
if [ ${exitStatus} = 0 ]; then
    echo "Your chosen option: #${OPTION} - ${cmdList[OPTION]}"
    ${cmdList[OPTION]}
else
    echo "You chose Cancel."
fi
exit 0
