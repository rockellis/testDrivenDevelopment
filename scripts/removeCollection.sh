#!/bin/bash
#

function setVariables {

  echo 'Setting Variables'
  printf '\n'

  COL=""

  while getopts "c" opt; do
    case $opt in
      c)
        echo "found c"
        COL=$OPTARG
        ;;
      \?)
        echo "Invalid option: -$OPTARG" >&2
        exit 1
        ;;
      :)
        echo "Option -$OPTARG requires an argument." >&2
        exit 1
        ;;
    esac
  done

  #  If col not set exit !!!
  # if []
  #

  # RESTRICTIONS='{"restrictions":{"eq":{'$RESTRICTIONS'}}}'
  COLLECTION='{"collection":'$COL'}'

  shift 1
}






  echo 'Setting Variables'
  printf '\n'

  ACTIVE=""     # active work orders
  USERNAME=""     # username
  WONUM=""      # work order number
  PAYROLLNO=""

  COUNTER=0     # Use this to track where our options end and arguments start

  while getopts ":aw:p:" opt; do
    case $opt in
      a)
        ACTIVE='"active":true'
        let COUNTER=COUNTER+1
        ;;
      w)
        WONUM='"wonum":"'$OPTARG'"'
        let COUNTER=COUNTER+2
        ;;
      p)
        PAYROLLNO='"payrollNo":"'$OPTARG'"'
        let COUNTER=COUNTER+2
        ;;
      \?)
        echo "Invalid option: -$OPTARG" >&2
        exit 1
        ;;
      :)
        echo "Option -$OPTARG requires an argument." >&2
        exit 1
        ;;
    esac
  done









function purgeCollection {

# fh_NO-APPNAME-DEFINED_WorkOrders
# fh_NO-APPNAME-DEFINED_WorkOrders-updates
# fh_NO-APPNAME-DEFINED_woSoapXMLIn
# fh_NO-APPNAME-DEFINED_Timesheets

  COLLECTION2='{"collection":"fake"}'
  echo 'running with:'$collection

  curl -X POST -H "Content-Type: application/json" -d $COLLECTION2 "$HOST/cloud/purgeCollection"
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

function reset {
  drop
}

# setVariables
setHost $1
purgeCollection



