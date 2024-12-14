document.addEventListener('DOMContentLoaded', function() {
  // 首先获取本地的 app 列表
  fetch('/data/apps.json')
    .then(response => response.json())
    .then(data => {
      const apps = data.apps;
      const randomApp = apps[Math.floor(Math.random() * apps.length)];
      
      // 使用 iTunes Search API 获取实时数据
      return fetch(`https://itunes.apple.com/lookup?id=${randomApp.id}&country=cn`)
        .then(response => response.json())
        .then(data => {
          if (data.results && data.results.length > 0) {
            const appInfo = data.results[0];
            
            // 更新 DOM
            document.querySelector('.app-icon').src = appInfo.artworkUrl100;
            document.querySelector('.app-icon').alt = appInfo.trackName;
            document.querySelector('.app-name').textContent = appInfo.trackName;
            document.querySelector('.app-description').textContent = 
              appInfo.description.length > 100 
                ? appInfo.description.substring(0, 100) + '...' 
                : appInfo.description;
            document.querySelector('.app-link').href = appInfo.trackViewUrl;
            
            // 显示评分
            const rating = appInfo.averageUserRating;
            const ratingCount = appInfo.userRatingCount;
            
            // 创建星星评分显示
            const starsHtml = createStarRating(rating);
            document.querySelector('.stars').innerHTML = starsHtml;
            document.querySelector('.rating-value').textContent = rating.toFixed(1);
            document.querySelector('.rating-count').textContent = `(${formatNumber(ratingCount)} 个评分)`;
          }
        });
    })
    .catch(error => console.error('Error loading random app:', error));
});

// 创建星星评分显示
function createStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let html = '';
  
  // 添加实心星星
  for (let i = 0; i < fullStars; i++) {
    html += '★';
  }
  
  // 添加半星
  if (hasHalfStar) {
    html += '⯨';
  }
  
  // 添加空心星星
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    html += '☆';
  }
  
  return html;
}

// 格式化数字
function formatNumber(num) {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  return num.toString();
}
