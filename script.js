const url_api =
  "https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=785883ac8f0248ddb4c988f4e071b780";

async function getNews(url) {
  const response = await fetch(url);
  const data = await response.json();

  renderCardNews(data?.articles);
}

function renderCardNews(datas) {
  let card = "";
  for (let data of datas) {
    const formating = new Date(data?.publishedAt);
    const formatDate =
      formating?.getDay() +
      "/" +
      formating?.getDate() +
      "/" +
      formating?.getFullYear();
    const formatTime =
      formating?.getHours() +
      "." +
      formating?.getMinutes() +
      "." +
      formating?.getSeconds();

    card += `
        <div class="card my-4 p-0 overflow-hidden">
        <img
        src=${data?.urlToImage}
        style="object-fit: cover"
        height="300"
        />
        <div class="card-body">
        <h4 class="card-title">${data?.title}</h4>
        <span class="text-secondary">${data?.author} - ${formatDate} ${formatTime}</span>
        <p class="mt-3">
           ${data?.description}
        </p>
        <a href="#" class="btn btn-primary">Read more...</a>
        </div>
        </div>
    `;
  }

  document.getElementById("news-card").innerHTML = card;
}

function searchNews() {
  const input = document.getElementById("exampleFormControlInput1");

  setTimeout(async () => {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${input.value}&apiKey=785883ac8f0248ddb4c988f4e071b780`
    );

    const data = await response.json();

    data?.articles?.length > 0 && renderCardNews(data?.articles);
  }, 1000);
}

window.onload = function () {
  getNews(url_api);
};

function load() {
  return `<tr>
      <td colspan="6" class="text-center">Loading...</td>
    </tr>`;
}

setTimeout(getData, 1000);
