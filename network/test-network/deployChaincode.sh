#!/bin/bash

set -e

./network.sh deployCC -ccn supply -ccv 1 -cci initLedger -ccl javascript -ccp  ../chaincode-supply/supply

cat <<EOF
