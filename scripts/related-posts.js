/**
 * 相关文章功能 - 获取同一天历史文章和随机文章
 */

hexo.extend.helper.register('get_same_day_posts', function(currentPost, maxCount = 5) {
  if (!currentPost || !currentPost.date) {
    return [];
  }
  
  const currentDate = currentPost.date;
  const currentMonth = currentDate.month() + 1; // moment.js month is 0-based
  const currentDay = currentDate.date();
  
  // 获取所有发布的文章
  const allPosts = this.site.posts.filter(post => post.published && post._id !== currentPost._id);
  
  // 筛选同一天（月-日）的历史文章
  const sameDayPosts = allPosts.filter(post => {
    const postDate = post.date;
    const postMonth = postDate.month() + 1;
    const postDay = postDate.date();
    
    return postMonth === currentMonth && postDay === currentDay;
  });
  
  // 按年份降序排序，取最近几年的
  return sameDayPosts
    .sort((a, b) => b.date.year() - a.date.year())
    .slice(0, maxCount);
});

hexo.extend.helper.register('get_random_posts', function(currentPost, maxCount = 5) {
  if (!currentPost) {
    return [];
  }
  
  // 获取所有发布的文章（排除当前文章）
  const allPosts = this.site.posts.filter(post => post.published && post._id !== currentPost._id);
  
  if (allPosts.length === 0) {
    return [];
  }
  
  // 随机打乱文章顺序
  const shuffled = allPosts.toArray().sort(() => 0.5 - Math.random());
  
  return shuffled.slice(0, maxCount);
});

hexo.extend.helper.register('get_related_posts', function(currentPost, maxCount = 5) {
  if (!currentPost || !currentPost.date) {
    return { posts: [], type: 'none', title: '' };
  }
  
  const currentDate = currentPost.date;
  const currentMonth = currentDate.month() + 1; // moment.js month is 0-based
  const currentDay = currentDate.date();
  
  // 获取所有发布的文章
  const allPosts = this.site.posts.filter(post => post.published && post._id !== currentPost._id);
  
  // 筛选同一天（月-日）的历史文章
  const sameDayPosts = allPosts.filter(post => {
    const postDate = post.date;
    const postMonth = postDate.month() + 1;
    const postDay = postDate.date();
    
    return postMonth === currentMonth && postDay === currentDay;
  });
  
  // 如果有同一天的文章
  if (sameDayPosts.length > 0) {
    // 按年份降序排序，取最近几年的
    const sortedSameDayPosts = sameDayPosts
      .sort((a, b) => b.date.year() - a.date.year())
      .slice(0, maxCount);
    
    return {
      posts: sortedSameDayPosts,
      type: 'same_day',
      title: `历史上的今天 (${currentPost.date.month() + 1}月${currentPost.date.date()}日)`
    };
  }
  
  // 如果没有同一天的文章，返回随机文章
  if (allPosts.length === 0) {
    return { posts: [], type: 'none', title: '' };
  }
  
  // 随机打乱文章顺序
  const shuffled = allPosts.toArray().sort(() => 0.5 - Math.random());
  const randomPosts = shuffled.slice(0, maxCount);
  
  return {
    posts: randomPosts,
    type: 'random',
    title: '推荐阅读'
  };
});