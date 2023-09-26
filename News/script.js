const sidebar = document.getElementById('sidebar');
const toggleButton = document.getElementById('sidebar-toggle');
const apiKey = 'your_api_key';


function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function startPage() {
    document.getElementById('head1').style.animationPlayState = 'running'; 
    await wait(2000);
    document.getElementById('waiter').style.display = 'none'; 
    document.body.style.backgroundColor = '';  
    fetchGNews(apiKey);
}



toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    toggleButton.classList.toggle('active');
});

window.onload = () => {
    startPage(); 
    toggleButton.disabled = false;
};

 



function fetchGNews(apiKey) {

    const apiUrl = `https://gnews.io/api/v4/search?q=apple&from=2023-09-24&to=2023-09-24&token=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById('newsContainer');

            if (data.articles && data.articles.length > 0) {
                data.articles.forEach(article => {
                    const newsDiv = document.createElement('div');
                    newsDiv.classList.add('news');

                    const img = document.createElement('img');
                    img.src = article.image || 'placeholder.jpg';
                    img.alt = article.title;

                    const contentDiv = document.createElement('div');
                    contentDiv.classList.add('news-content');

                    const h2 = document.createElement('h2');
                    h2.textContent = article.title;

                    const p = document.createElement('p');
                    p.textContent = article.description;

                    newsDiv.addEventListener('click', () => {
                        window.open(article.url, '_blank');
                    });

                    contentDiv.appendChild(h2);
                    contentDiv.appendChild(p);

                    newsDiv.appendChild(img);
                    newsDiv.appendChild(contentDiv);

                    newsContainer.appendChild(newsDiv);
                });
            } 
        })
       
}

function fetchBusinessNewsGNews(apiKey) {
    const businessUrl = `https://gnews.io/api/v4/top-headlines?country=us&topic=business&token=${apiKey}`;

    fetch(businessUrl)
        .then(response => response.json())
        .then(data => {
            const businessNewsContainer = document.getElementById('businessNews');
            businessNewsContainer.innerHTML = '';

            if (data.articles && data.articles.length > 0) {
                data.articles.forEach(article => {
                    const newsDiv = document.createElement('div');
                    newsDiv.classList.add('news');

                    const img = document.createElement('img');
                    img.src = article.image || 'placeholder.jpg';
                    img.alt = article.title;

                    const contentDiv = document.createElement('div');
                    contentDiv.classList.add('news-content');

                    const h2 = document.createElement('h2');
                    h2.textContent = article.title;

                    const p = document.createElement('p');
                    p.textContent = article.description;

                    newsDiv.addEventListener('click', () => {
                        window.open(article.url, '_blank');
                    });

                    contentDiv.appendChild(h2);
                    contentDiv.appendChild(p);

                    newsDiv.appendChild(img);
                    newsDiv.appendChild(contentDiv);

                    businessNews.appendChild(newsDiv);
                });
            } 
        })
        
}


const businessButton = document.getElementById('business-page');
const newsContainer = document.getElementById('newsContainer');
const businessNews = document.getElementById('businessNews');

businessButton.addEventListener('click', () => {
    fetchBusinessNewsGNews(apiKey);
    newsContainer.style.display = 'none';
    businessNews.style.display = 'block';
    document.getElementById('head1').innerHTML = 'Business News';
});

const homePage = document.getElementById('home-page');
homePage.addEventListener('click', () => {
    newsContainer.style.display = 'block';
    businessNews.style.display = 'none';
    document.getElementById('head1').innerHTML = 'News';
});


const searching = document.getElementById('search');
const searchNews = document.getElementById('search-news');
const shutDown = document.getElementById('cross');

searchNews.addEventListener('click',() => {
    searching.style.display='block';
});

shutDown.addEventListener('click', () => {
    searching.style.display='none';
});


function searchNewsByKeyword(apiKey, keyword) {
    const apiUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(keyword)}&from=2023-09-24&to=2023-09-24&token=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const searchResultsContainer = document.getElementById('searchResults');
            searchResultsContainer.innerHTML = '';

            if (data.articles && data.articles.length > 0) {
                data.articles.forEach(article => {
                    const newsDiv = document.createElement('div');
                    newsDiv.classList.add('news');

                    const img = document.createElement('img');
                    img.src = article.urlToImage || 'placeholder.jpg';
                    img.alt = article.title;

                    const contentDiv = document.createElement('div');
                    contentDiv.classList.add('news-content');

                    const h2 = document.createElement('h2');
                    h2.textContent = article.title;

                    const p = document.createElement('p');
                    p.textContent = article.description;

                    newsDiv.addEventListener('click', () => {
                        window.open(article.url, '_blank');
                    });

                    contentDiv.appendChild(h2);
                    contentDiv.appendChild(p);

                    newsDiv.appendChild(img);
                    newsDiv.appendChild(contentDiv);

                    searchResultsContainer.appendChild(newsDiv);
                });
            } 
        })
       
}

const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const searchResultsContainer = document.getElementById('searchResults');

searchBtn.addEventListener('click', () => {
    const keyword = searchInput.value.trim();
    if (keyword) {
        searchNewsByKeyword(apiKey, keyword);
        searchResultsContainer.style.display = 'block';
    }
});
