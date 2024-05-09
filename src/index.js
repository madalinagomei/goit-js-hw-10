import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderElement = document.querySelector('.loader');
const errorElement = document.querySelector('.error');

loaderElement.style.display = 'none';
errorElement.style.display = 'none';

fetchBreeds()
  .then(breeds => {
    const fragmentElement = document.createDocumentFragment();
    breeds.forEach(breed => {
      const optionElement = document.createElement('option');
      optionElement.textContent = breed.name;
      optionElement.value = breed.id;
      fragmentElement.append(optionElement);
    });

    breedSelect.append(fragmentElement);
    new SlimSelect({
      select: breedSelect,
    });
  })
  .catch(error => {
    loaderElement.style.display = 'none';
    Notify.failure(errorElement.textContent, error);
    errorElement.style.display = 'block';
  });

breedSelect.addEventListener('change', function () {
  const breedId = breedSelect.value;
  loaderElement.style.display = 'block';
  catInfo.style.display = 'none';
  fetchCatByBreed(breedId)
    .then(catData => {
      loaderElement.style.display = 'none';
      catInfo.style.display = 'flex';
      catInfo.innerHTML = `<img class="catImage" src=${catData[0].url}  width="300px" alt="Image of a ${catData[0].breeds[0].name} cat ">
      <h1 class="catBreed">${catData[0].breeds[0].name}  </h1>
      <p class="catDescription">${catData[0].breeds[0].description}  </p>
      <p class="catTemperament">Temperament: ${catData[0].breeds[0].temperament}  </p>
      `;
    })
    .catch(error => {
      loaderElement.style.display = 'none';
      Notify.failure(errorElement.textContent, error);
    });
});
