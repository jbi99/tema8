const container = document.querySelector(".categories");
const template = document.querySelector("#category_template").content;

fetch("https://kea-alt-del.dk/t7/api")
  .then((res) => res.json())
  .then((data) => {
    data.slice(0, 6).forEach(showCategory);
  });

function showCategory(category) {
  const copy = template.cloneNode(true);

  copy.querySelector("a").href = `produktlist.html?category=${category.category}`;
  copy.querySelector("a").textContent = category.category;

  container.appendChild(copy);
}
