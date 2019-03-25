module.exports = {
  apps: [
    {
      name: 'dev-server',
      script: './server/server.dev.ts',
      watch: ['server', 'config', 'proxy'],
      // instances: 'max',
      // exec_mode: 'cluster',
      autorestart: true,
      max_memory_restart: '1G',
      interpreter: './node_modules/.bin/ts-node',
      env_csr: {
        NODE_ENV: 'development',
        RENDER_MODE: 'csr',
      },
      env_ssr: {
        NODE_ENV: 'development',
        RENDER_MODE: 'ssr',
      },
      node_args: '--project ./tsconfig.node.json --transpileOnly',
    },
  ],

  // deploy: {
  //   production: {
  //     user: 'node',
  //     host: '212.83.163.1',
  //     ref: 'origin/master',
  //     repo: 'git@github.com:repo.git',
  //     path: '/var/www/production',
  //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
  //   },
  // },
};
