#!/bin/bash

APPNAME="${@:1}"

function usage(){
echo ''' 
usage: ./deploy.sh app_name
    app_name    The Cloud Foundry target app name
'''
}

if [ ! -n "$APPNAME" ]; then
    usage 
    exit 1
fi

function deploy() {
    cf push ${APPNAME}
}

deploy