#!/bin/bash

function upload {
  # curl -k -sslv3 \
  curl -k \
    -X POST "$HOST/ws/MobileDataManager" \
    -d @"$1"
}

function populate {
  echo 'Starting populate'

  upload ./soapRequests/updateJob1.xml
  # upload ./soapRequests/job2.xml
  # upload ./soapRequests/job3.xml
}

function setHost {
  if [ "$1" == 'rhdev' ]
    then
      echo 'Populating Dummy User for SWW DEV Environment'
      HOST="https://iss-iorgmauj6xvrcvvef5nhkhis-dev.mbaas1.eu.feedhenry.com"
  # elif [ "$1" == 'swwfhdev' ]
  #   then
  #     echo 'Populating Dummy User for FH DEV Environment'
  #     HOST="https://kier-sww-0nxfkqs32ixxvfzfttzrh5s0-dev.df.dev.e111.feedhenry.net"
  # elif [ "$1" == 'swwtest' ]
  #   then
  #     echo 'Populating Dummy User for TEST Environment'
  #     HOST="https://kier-sww-afthcs4jbtyo92qyu5vsij0q-dev.df.dev.e111.feedhenry.net"
  # elif [ "$1" == 'swwstg' ]
  #   then
  #     echo 'Populating Dummy User for Staging Environment'
  #     HOST="https://kier-sww-0gbhydd0ghbusdh4tvesuolo-dev.df.dev.e111.feedhenry.net"
  # elif [ "$1" == 'swwprod' ]
  #   then
  #     echo 'Populating Dummy User for PROD Environment'
  #     HOST="https://kier-sww-j8eg7dlvniuvcvo97gofs11w-live.df.live.e111.feedhenry.net"
  else
    # local is the default
    echo 'Populating Dummy User for LOCAL Environment'
    HOST="http://127.0.0.1:8001"
  fi
}

setHost $1
populate


