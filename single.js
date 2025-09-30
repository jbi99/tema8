const params = new URLSearchParams(window.location.search);
let id = params.get("id") || 1163;

fetch(`https://kea-alt-del.dk/t7/api${id}`)
  .then((res) => {
    if (!res.ok) {
      return fetch(`https://kea-alt-del.dk/t7/api/products/1163`).then((r) => r.json());
    }
    return res.json();
  })
  .then(showProduct)
  .catch(() => {
    showProduct({
      id: 1163,
      productdisplayname: "Sahara Team India Fanwear Round Neck Jersey",
      basecolour: "Blue",
      brandname: "Nike",
      brandbio: "Nike, creating experiences for today's athlete",
      articletype: "Tshirts",
    });
  });

function showProduct(product) {
  const img = document.querySelector(".product_image img");
  img.src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  img.alt = product.productdisplayname;

  document.querySelectorAll(".name").forEach((el) => {
    el.textContent = product.productdisplayname;
  });

  document.querySelector(".color").textContent = product.basecolour;
  document.querySelector(".inventory").textContent = product.id;
  document.querySelector(".brand").textContent = product.brandname;
  document.querySelector(".brandbio").textContent = product.brandbio;

  document.querySelector(".brandtype").textContent = `${product.brandname} | ${product.articletype}`;
}
