const loadAllNewsCategory = async() => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  
  try{
    const response = await fetch(url);
    const data = await response.json();
    displayAllNewsCategory(data.data.news_category);
  }
  catch (error){
    console.log(error);
  }
}

const displayAllNewsCategory = newsCategory => {
  // console.log(category);

  const allNewsCategory = document.getElementById('all-news-category');

  for(let news of newsCategory){
    // console.log(news);
    const newsDiv = document.createElement('div');
    newsDiv.innerHTML = `
      <a class="text-decoration-none text-secondary px-3 mb-3" href="#"
      >${news.category_name}</a>
    `

    allNewsCategory.appendChild(newsDiv);
  }
}

loadAllNewsCategory();