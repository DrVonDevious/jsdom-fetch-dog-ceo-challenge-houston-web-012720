console.log('%c HI', 'color: firebrick');

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener("DOMContentLoaded", () => {

  let filter = document.querySelector("#breed-dropdown");

  fetch(imgUrl)
  .then( res => res.json() )
  .then( data => {
    const image_container = document.querySelector("#dog-image-container")
    for (const image of data["message"]) {
      img = document.createElement("img");
      console.log(image)
      img.src = image;
      image_container.append(img);
    }
  });
  fetch(breedUrl)
    .then( res => res.json() )
    .then( json => {
      const breed_list = document.querySelector("#dog-breeds")

      for (const breed in json["message"]) {

        const breed_item = document.createElement("li");

        breed_item.addEventListener("click", () => {
          breed_item.style.color = "blue"
        });

        breed_item.innerText = breed
        breed_list.append(breed_item);

        if (json["message"][breed].length > 0) {

          const sub_list = document.createElement("ul");
          breed_item.append(sub_list);

          for (const sub of json["message"][breed]) {
            const sub_breed = document.createElement("li");
            sub_breed.innerText = sub;
            sub_list.append(sub_breed);
          };

        };

      };
    });

  filter.addEventListener("change", () => {
    let all_breeds = Array.from(document.querySelectorAll("li"))
    let filtered_breeds = all_breeds.filter( breed => breed.innerText[0] == ["a", "b", "c", "d"][event.target.selectedIndex])
    // debugger
    all_breeds.forEach( breed => {
      breed.style.display = "none"
    })
    filtered_breeds.forEach( breed => {
      breed.style.display = "list-item"
    })

  });
});
