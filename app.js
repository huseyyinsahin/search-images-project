const cardDiv = document.getElementById("cardDiv");
const loadingDiv = document.getElementById("loading");
const containerDiv = document.querySelector(".container");
const tarih = document.getElementById("tarih");
const search = document.querySelector("#search");
const numberOfImages = document.querySelector("#numberOfImages");

/*           tarih belirtme          */
const outputDate = () => {
  let currentDate = new Date();
  let date = currentDate.toLocaleDateString();
  let time = currentDate.toLocaleTimeString();
  let currentDateTime = date + " " + time;
  tarih.textContent = currentDateTime;
};
setInterval(outputDate, 1000);

/*         loading çalıştırma         */
setTimeout(() => {
  loadingDiv.style.display = "none";
  containerDiv.classList.remove("d-none");
  containerDiv.classList.add("d-flex");
  show();
}, 1500);

/*          verileri getirme          */
const show = async (newInput = "istanbul", newNumberOfImages = "10") => {
  cardDiv.innerHTML = `<img src="./img/loading.gif"/>`;
  const url = `https://pixabay.com/api/?key=45224779-712f943f3d7c809209751790f&q=${newInput}&image_type=photo&pretty=true&per_page=${newNumberOfImages}&page=${
    Math.floor(Math.random() * 10) + 1
  }`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("");
    }
    const data = await res.json();
    showImage(data);
  } catch (error) {
    cardDiv.innerHTML = `<img src="./img/error.gif" />`;
  }
};

/*            verileri ekrana yazdır         */
function showImage({ hits }) {
  cardDiv.innerHTML = "";
  hits.forEach(({ largeImageURL, tags, user, views }) => {
    cardDiv.innerHTML += `
  <div class="card" style="width: 18rem;">
  <img src="${largeImageURL}" class="card-img-top" style="height:200px; width:100%;" alt="...">
  <div class="card-body text-center">
    <h5 class="card-title"> ${tags.split(",")[0].toUpperCase()}</h5>
    <p class="card-text">Username: ${user}</p>
    <p class="card-text">Views: ${views}</p>
  </div>
</div>`;
  });
}

let newInput = "";
let newNumberOfImages = "";

/*     inputa yazılınca yeni resim gelmesi  */
search.addEventListener("input", () => {
  newInput = search.value;
  show(newInput, newNumberOfImages);
});
numberOfImages.addEventListener("input", () => {
  newNumberOfImages = numberOfImages.value;
  show(newInput, newNumberOfImages);
});
