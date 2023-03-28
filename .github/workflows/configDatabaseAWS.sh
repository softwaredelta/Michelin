#!/bin/bash

sed -i 's/const onDeployedEnv = false;/const onDeployedEnv = true;/' ../../api/util/db-connector.js