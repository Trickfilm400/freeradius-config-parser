#!/bin/sh

if [ -f "/data/done" ]; then echo "Files already exist"; exit 0; fi
apk add binutils
cd /data
wget http://ftp.de.debian.org/debian/pool/main/f/freeradius/freeradius-config_3.2.3+dfsg-2+b4_amd64.deb -O /data/file.deb
mkdir deb_content -p
ar x --output=deb_content ./file.deb
ar --version
cd deb_content
mkdir data -p
tar -xvf ./data.tar.xz -C data

touch /data/done