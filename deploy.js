/* eslint-disable no-console */
const path = require('path');
const SftpClient = require('ssh2-sftp-client');

require('dotenv').config();

const config = {
  host: process.env.FTP_DEPLOY_HOST,
  username: process.env.FTP_DEPLOY_USERNAME,
  password: process.env.FTP_DEPLOY_PASSWORD,
  port: process.env.FTP_DEPLOY_PORT || 22,
};

const directories = {
  themes: {
    local: '/wp-content/themes',
    remote: '/var/www/hasanirogers.me/public_html/wp-content/themes'
  },
  plugins: {
    local: '/wp-content/plugins',
    remote: '/var/www/hasanirogers.me/public_html/wp-content/plugins'
  },
  filter: /^(?!.*(.git|.github|node_modules))/gm
};

const upload = async () => {
  const client = new SftpClient();
  const themesSRC = path.join(__dirname, directories.themes.local);

  try {
    await client.connect(config);

    client.on('upload', (info) => {
      console.log(`Listener: Uploaded ${info.source}`);
    });

    const options = {
      filter: (path, isDirectory) => directories.filter.test(path)
    }

    await client.uploadDir(themesSRC, directories.themes.remote, options);

    return;
  } finally {
    client.end();
  }
};

upload()
  .then(message => console.log(message))
  .catch((error) => { console.log(`main error: ${error.message}`); });
