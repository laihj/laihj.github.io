hexo.extend.console.register('daily', 'Create a new daily post.', {}, function(args) {
  const moment = require('moment');
  const { spawn } = require('child_process');
  
  // Generate today's date in yyyyMMdd format
  const today = moment().format('YYYYMMDD');
  
  // Create the post using the daily scaffold
  return this.call('new', {
    _: ['daily', today]
  }).then(() => {
    // Auto open the created file in VSCode
    const fileName = `${moment().format('YYYY-MM-DD')}-${today}.md`;
    const filePath = `source/_posts/${fileName}`;
    
    // Open in VSCode
    spawn('code', [filePath], { 
      stdio: 'ignore',
      detached: true 
    });
    
    this.log.info(`Opening ${filePath} in VSCode...`);
  });
});