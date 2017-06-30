#!/bin/bash



cd trunk

svn up

mvn clean package

service tomcat8 stop

cp target/mclm.war /var/lib/tomcat8/webapps
rm -rf /var/lib/tomcat8/webapps/mclm

service tomcat8 start



