#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error
set -e

# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1
starttime=$(date +%s)

##install node packages
#pushd ./chaincode-supply/supply/
#npm install
#popd

# check install binaries if not exist
./installBinaries.sh

# clean out any old identites in the wallets
rm -rf javascript/wallet/*
rm -rf javascript/wallet2/*
rm -rf javascript/wallet3/*
rm -rf ../api/identity
#rm -rf java/wallet/*
#rm -rf typescript/wallet/*
#rm -rf go/wallet/*

# launch network; create channel and join peer to channel
pushd ./test-network
./network.sh down
./network.sh up createChannel -ca -s couchdb -c mychannel
#./network.sh deployCC -ccn fabcar -ccv 1 -cci initLedger -ccl ${CC_SRC_LANGUAGE} -ccp ${CC_SRC_PATH}
popd
pushd ./test-network/addOrg3
./addOrg3.sh up -ca -s couchdb -c mychannel
popd

##Deploy chaincode on org1, org2
pushd ./test-network
./network.sh deployCC -ccn supply -ccp ../chaincode-supply/supply/ -ccl javascript -cci initLedger -c mychannel #remove initLedger
popd

##export path for org3
export PATH=${PWD}/bin:$PATH
export FABRIC_CFG_PATH=${PWD}/config/
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org3MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/test-network/organizations/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/test-network/organizations/peerOrganizations/org3.example.com/users/Admin@org3.example.com/msp
export CORE_PEER_ADDRESS=localhost:11051

#package chaincode
peer lifecycle chaincode package supply.tar.gz --path ./chaincode-supply/supply/ --lang node --label supply_1.0

#install
peer lifecycle chaincode install supply.tar.gz

#get the package identifier
peer lifecycle chaincode queryinstalled

#approve chaincode
export PACKAGE_ID=$(peer lifecycle chaincode calculatepackageid supply.tar.gz)
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/test-network/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" --channelID mychannel --name supply --version 1.0 --package-id $PACKAGE_ID --sequence 1 --init-required

#commit query
peer lifecycle chaincode querycommitted --channelID mychannel --name supply  --cafile "${PWD}/test-network/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"

#init
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/test-network/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n supply --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/test-network/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:11051 --tlsRootCertFiles "${PWD}/test-network/organizations/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt" -c '{"function":"initLedger", "Args":[]}'

cat <<EOF

Total setup execution time : $(($(date +%s) - starttime)) secs ...
EOF
