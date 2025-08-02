hexo.extend.console.register('publish', 'Git add, commit and push changes.', {}, function(args) {
  const { exec } = require('child_process');
  const moment = require('moment');
  
  // Generate timestamp for commit message
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
  const commitMessage = `update: ${timestamp}`;
  
  console.log('Starting git publish...');
  
  return new Promise((resolve, reject) => {
    // Execute git add .
    exec('git add .', (error, stdout, stderr) => {
      if (error) {
        console.error('Git add failed:', error);
        return reject(error);
      }
      console.log('✓ git add completed');
      
      // Execute git commit
      exec(`git commit -m "${commitMessage}"`, (error, stdout, stderr) => {
        if (error) {
          console.error('Git commit failed:', error);
          return reject(error);
        }
        console.log('✓ git commit completed');
        console.log(`Commit message: ${commitMessage}`);
        
        // Execute git push
        exec('git push', (error, stdout, stderr) => {
          if (error) {
            console.error('Git push failed:', error);
            return reject(error);
          }
          console.log('✓ git push completed');
          console.log('Git publish finished successfully!');
          resolve();
        });
      });
    });
  });
});