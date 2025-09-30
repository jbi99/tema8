const container = document.querySelector(".product_list_container");
const template = document.querySelector("#product_template").content;

const params = new URLSearchParams(window.location.search);
const category = params.get("category");

let url = "https://kea-alt-del.dk/t7/api/products";
if (category) {
  url = `https://kea-alt-del.dk/t7/api/products?category=${category}`;
}

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    if (!category) {
      data = data.slice(0, 4);
    }
    data.forEach(showProduct);
  });

function showProduct(product) {
  const copy = template.cloneNode(true);

  copy.querySelector("a").href = `product.html?id=${product.id}`;

  const img = copy.querySelector("img");
  img.src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  img.alt = product.productdisplayname;

  copy.querySelector("h3").textContent = product.productdisplayname;
  copy.querySelector(".brand").textContent = `${product.articletype} | ${product.brandname}`;

  if (product.discount) {
    copy.querySelector(".price").innerHTML = `
      <span style="text-decoration: line-through; color:#777;">Prev. DKK ${product.price},-</span><br>
      <span style="color:red; font-weight:bold;">Now DKK ${Math.floor(product.price * (1 - product.discount / 100))},-</span>
    `;
    copy.querySelector(".discount").textContent = `-${product.discount}%`;
  } else {
    copy.querySelector(".price").textContent = `DKK ${product.price},-`;
    copy.querySelector(".discount").remove();
  }

  if (product.soldout) {
    copy.querySelector(".sold").textContent = "Sold Out";
    img.style.opacity = "0.4";
  } else {
    copy.querySelector(".sold").remove();
  }

  container.appendChild(copy);
}
