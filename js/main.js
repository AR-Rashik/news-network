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
      <a onclick="loadNewsCategoryDetails('${news.category_id}')" class="text-decoration-none text-secondary px-3 mb-3" href="#"
      >${news.category_name}</a>
    `

    allNewsCategory.appendChild(newsDiv);
  }
}

const loadNewsCategoryDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  try{
    const response = await fetch(url);
    const data = await response.json();
    displayNewsCategoryDetails(data.data);
  }
  catch (error){
    console.log(error);
  }
}

const displayNewsCategoryDetails = details => {
  // console.log(details);

  const newsDeatailsContainer = document.getElementById("news-details-container");
  newsDeatailsContainer.textContent = "";

  // for(let detail of details){
  //   console.log(detail);
  // }

  details.forEach(detail => {
    console.log(detail);
    const {title, author, details, image_url, thumbnail_url, total_view} = detail;
    // console.log(author.name);
    // console.log(title);

    const newsDetailsDiv = document.createElement('div');
    newsDetailsDiv.innerHTML = `
        <div class="col-12">
        <div
          class="d-flex flex-column flex-md-row border border-1 rounded-2 shadow-sm p-3"
        >
          <img
            class="img-fluid rounded"
            src="${thumbnail_url}"
            alt=""
          />
          <div class="d-flex flex-column justify-content-center ps-4 mt-lg-0 mt-4">
            <h4 class="text-dark fs-4 fw-bold mb-3">${title}</h4>
            <p class="text-secondary mb-4">${details.length > 500 ? details.slice(0, 500) + '...' : details}</p>
            <div class="d-flex justify-content-between flex-wrap">
              <div class="d-flex justify-content-center align-items-center w-auto mb-3 mb-md-0">
                <img class="img-fluid" src="images/author.png" alt="">
                <div class="d-flex flex-column ps-2">
                  <div class="author-name text-black">${author.name === 'system' ? 'No author found' : author.name}</div>
                  <div class="author-time text-black-50">Jan 10, 2022 </div>
                </div>
              </div>
              <div class="fw-semibold fs-6">
                <i class="bi bi-eye"></i>
                <span class="ms-2"><span>${total_view}</span>M</span>
              </div>
              <div class="">
                <i class="bi bi-star-half"></i>
                <i class="bi bi-star"></i>
                <i class="bi bi-star"></i>
                <i class="bi bi-star"></i>
                <i class="bi bi-star"></i>
              </div>
              <div>
                <i id="btn-details-news" class="bi bi-arrow-right fs-4"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
    newsDeatailsContainer.appendChild(newsDetailsDiv);
  })
}

loadAllNewsCategory();