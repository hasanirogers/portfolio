'use strict';

const path = require('path');
const SftpClient = require('ssh2-sftp-client');
const { exec } = require("child_process");
const remoteDir = '/var/www/hasanirogers.me/public_html';

require('dotenv').config();

const config = {
  host: process.env.FTP_DEPLOY_HOST,
  username: process.env.FTP_DEPLOY_USERNAME,
  password: process.env.FTP_DEPLOY_PASSWORD,
  port: process.env.FTP_DEPLOY_PORT || 22
};

const main = async () => {
  const client = new SftpClient();

  try {
    await client.connect(config);

    client.on('upload', info => {
      console.log(`Listener: Uploaded ${info.source}`);
    });

    await client.uploadDir(__dirname, remoteDir);
    await client.rmdir(path.join(remoteDir, 'node_modules'), true);

  } finally {
    client.end();
  }
}

main()
  .then(message => console.log(message))
  .catch(error => { console.log(`main error: ${error.message}`)});
