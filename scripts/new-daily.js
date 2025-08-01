hexo.extend.console.register('daily', 'Create a new daily post.', {}, function(args) {
  const moment = require('moment');
  
  // Generate today's date in yyyyMMdd format
  const today = moment().format('YYYYMMDD');
  
  // Create the post using the daily scaffold
  return this.call('new', {
    _: ['daily', today]
  });
});