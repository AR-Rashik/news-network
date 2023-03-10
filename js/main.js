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

  const allNewsCategory = document.getElementById('all-news-category');

  for(let news of newsCategory){
    const newsDiv = document.createElement('div');
    newsDiv.innerHTML = `
      <a onclick="loadNewsCategoryDetails('${news.category_id}')" class="text-decoration-none text-secondary px-3 mb-3" href="#"
      >${news.category_name}</a>
    `

    allNewsCategory.appendChild(newsDiv);
  }
}

const loadNewsCategoryDetails = async id => {

  toggleSpinner(true);

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

  const newsCategoryItemsFound = document.getElementById('news-category-items-found');
  newsCategoryItemsFound.innerText = details.length;

  const newsDeatailsContainer = document.getElementById("news-details-container");
  newsDeatailsContainer.textContent = "";

  details.sort(function(a, b) {
    return b.total_view - a.total_view;
  });

  details.forEach(detail => {

    const {title, author, details, thumbnail_url, total_view, _id} = detail;
    
    toggleSpinner(false);
    
    const newsDetailsDiv = document.createElement('div');

    toggleSpinner(false);

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
            <p class="text-secondary mb-5">${details.length > 500 ? details.slice(0, 500) + '...' : details}</p>
            <div class="d-flex justify-content-between flex-wrap">
              <div class="d-flex justify-content-center align-items-center w-auto mb-3 mb-md-0">
                <img class="img-fluid rounded-circle author-img" src="${author.img}" alt="">
                <div class="d-flex justify-content-center align-items-center flex-column ps-3">
                  <div class="author-name text-black">${author.name === null ? 'Not available' : author.name}</div>
                  <div class="author-time text-black-50">Jan 10, 2022 </div>
                </div>
              </div>
              <div class="fw-semibold fs-6">
                <i class="bi bi-eye"></i>
                <span class="ms-2"><span>${total_view === null ? "Not available " : total_view}</span> M</span>
              </div>
              <div class="">
                <i class="bi bi-star-half"></i>
                <i class="bi bi-star"></i>
                <i class="bi bi-star"></i>
                <i class="bi bi-star"></i>
                <i class="bi bi-star"></i>
              </div>
              <div>
                <i onclick="loadNewsModalDetails('${_id}')" id="btn-details-news" class="bi bi-arrow-right fs-4" data-bs-toggle="modal" data-bs-target="#newsDetailsModal"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
    newsDeatailsContainer.appendChild(newsDetailsDiv);
  })
}

const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none');
  }
  else{
    loaderSection.classList.add('d-none');
  }
}

const loadNewsModalDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  
  try{
    const response = await fetch(url);
    const data = await response.json();
    displayNewsDetailsModal(data.data);
  }
  catch(error){
    console.log(error);
  }
}

const displayNewsDetailsModal = details => {
  
  for(let detail of details){
    console.log(detail);

    const modalTitle = document.getElementById('newsDetailsModalLabel');
    modalTitle.innerText = detail.title;

    const modalContainer = document.getElementById('news-modal-body');
    modalContainer.innerHTML = `
      <div class="text-center mb-3"><img class="img-fluid w-50 rounded-circle" src="${detail.author.img}"></div>
      <div>Author name: ${detail.author.name === null ? "Not Available" : detail.author.name}</div>
      <div>Date: ${detail.author.published_date}</div>
      <div>View: ${detail.total_view === null ? "Not available " : detail.total_view} M</div>
      <div>Rating: ${detail.rating.number}</div>
    `
  }
}

loadAllNewsCategory();