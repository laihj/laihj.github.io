document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.random-app-widget');
  if (!container) return;

  // 从 apps.json 获取随机应用
  fetch('/data/apps.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        return response.json();
      }
    })
    .then(data => {
      // 随机选择一个应用
      const randomIndex = Math.floor(Math.random() * data.apps.length);
      const selectedApp = data.apps[randomIndex];
      const appId = selectedApp.id;
      
      // 使用 iTunes Search API 获取实时数据
      return fetch(`https://itunes.apple.com/lookup?id=${appId}&country=cn`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        return response.json();
      }
    })
    .then(data => {
      if (data.results && data.results.length > 0) {
        const appInfo = data.results[0];
        console.log('App info:', appInfo); // 添加调试日志
        
        // 更新 DOM
        const container = document.querySelector('.random-app-widget');
        if (container) {
          container.querySelector('.app-icon').src = appInfo.artworkUrl100;
          container.querySelector('.app-icon').alt = appInfo.trackName;
          container.querySelector('.app-name').textContent = appInfo.trackName;
          container.querySelector('.app-description').textContent = 
            appInfo.description.length > 150 
              ? appInfo.description.substring(0, 150) + '...' 
              : appInfo.description;
          container.querySelector('.app-link').href = appInfo.trackViewUrl;
          
          // 显示评分信息
          if (appInfo.averageUserRating) {
            container.querySelector('.rating-value').textContent = appInfo.averageUserRating.toFixed(1);
            container.querySelector('.rating-count').textContent = 
              `(${formatNumber(appInfo.userRatingCount)}条评分)`;
            container.querySelector('.stars').innerHTML = createStarRating(appInfo.averageUserRating);
          }
        }
      }
    })
    .catch(error => {
      console.error('Error loading app info:', error);
      const container = document.querySelector('.random-app-widget');
      if (container) {
        container.style.display = 'none';
      }
    });
});

// 创建星星评分显示
function createStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.3 && rating % 1 <= 0.7;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  let html = '';
  
  // 添加实心星星
  for (let i = 0; i < fullStars; i++) {
    html += '<i class="fas fa-star"></i>';
  }
  
  // 添加半星（如果需要）
  if (hasHalfStar) {
    html += '<i class="fas fa-star-half-alt"></i>';
  }
  
  // 添加空心星星
  for (let i = 0; i < emptyStars; i++) {
    html += '<i class="far fa-star"></i>';
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
