


function setVariables {

  echo 'Setting Variables'
  printf '\n'

  USERNAME=""     # username
  PASSWORD=""

  COUNTER=0     # Use this to track where our options end and arguments start

  while getopts "u:p:" opt; do
    case $opt in
      u)
        USERNAME='"username":"'$OPTARG'"'
        let COUNTER=COUNTER+2
        ;;
      p)
        PASSWORD='"password":"'$OPTARG'"'
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

  #
  if [ "$COUNTER" -ne 2 ]; then
    echo "Please provide a username (-u) and password (-p_)";
    exit;
  fi
}


function run {

  # We need to move the options arguments away
  shift $COUNTER

  PARAMS='{"username":'$USERNAME',"password":'$PASSWORD'}'

  if [[ $# -eq 0 ]]; then
    curl -X POST -H "Content-Type: application/json" -d $PARAMS http://127.0.0.1:8001/cloud/authenticateUser
  else
    if [[ -z "$2" ]]; then
        ENV='live'
    else
      ENV=$2
    fi
    # TODO: this will need to
    echo "running cmd:  fhc act" $1 "getMongoCollection" $PARAMS $ENV
    fhc act $1 authenticateUser $PARAMS $ENV
  fi
}



function start {
  printf '\n\n'
  echo '****************************************** Starting Script ******************************************'
  printf '\n\n'
}

function end {
  printf '\n\n'
  echo '****************************************** Finished Script ******************************************'
  printf '\n\n'
}






# set -x      // verbose logging on
start
setVariables "$@"
run "$@"
end