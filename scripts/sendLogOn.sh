

# curl -X POST "https://iss-iorgmauj6xvrcvvef5nhkhis-dev.mbaas1.eu.feedhenry.com/cloud/getWorkOrders"

# https://gmptest.uk.issworld.com:3433?wsdl

# https://gmptest.uk.issworld.com:3433/CogMobDataEngPushItf.asmx

curl -k -X POST -H "Transfer-Encoding: chunked" -H "SOAPAction: /Cog/Svcs/Itfs/MobDataEngSvc/Soap/ReceiveMobDataOp" "https://gmptest.uk.issworld.com:3433/CogMobDataEngPushItf.asmx" -H "Content-Type: text/xml; charset=UTF-8" -u "gmp-mobile:R!ca&36vQh4" -d @"./soapRequests/logOnTest.xml"

# curl -k -X POST -H "Transfer-Encoding: chunked" -H "SOAPAction: /Cog/Svcs/Itfs/MobDataEngSvc/Soap/ReceiveMobDataOp" "https://gmptest.uk.issworld.com:3433/CogMobDataEngPushItf.asmx" -H "Content-Type: text/xml; charset=UTF-8" -u "gmp-mobile:R!ca&36vQh4" -d @"./soapRequests/logOnLee.xml"


# application/soap+xml