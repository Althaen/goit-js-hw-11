import './sass/main.scss';
import getElements from './js/api';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('#search-form'),
  input: document.querySelector('input'),
};
let galleryLiteBox = new SimpleLightbox('.gallery a');
let inputValue = '';
let page = 1;

async function renderItems(name) {
  try {
    const items = await getElements(name, page);
    // console.dir(items)
    // console.log(items, items.data, items.data.hits)
    if (items.data.hits.length > 0) {
      let listMarkup = items.data.hits
        .map(item => {
          return `
      <a class="gallery__link" href="${item.webformatURL}">
      <div class="photo-card">
      <img src="${item.previewURL}" alt="${item.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>${item.likes} Likes</b>
        </p>
        <p class="info-item">
          <b>${item.views} Views</b>
        </p>
        <p class="info-item">
          <b>${item.comments} Comments</b>
        </p>
        <p class="info-item">
          <b>${item.downloads} Downloads</b>
        </p>
      </div>
    </div>
    </a>`;
        })
        .join(' ');

      refs.gallery.insertAdjacentHTML('beforeEnd', listMarkup);
      Notiflix.Notify.info(`Hooray! We found ${items.data.totalHits} images.`);
      galleryLiteBox.refresh();

      return (page += 1);
    }
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  } catch (error) {
    console.log(error);
  }
}

refs.input.addEventListener('input', e => {
  inputValue = e.target.value;

  return inputValue;
});

refs.form.addEventListener('submit', onSubmitForm);
function onSubmitForm(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  page = 1;

  console.dir(inputValue);
  renderItems(inputValue);
  return;
}

window.addEventListener('scroll', e => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight) {
    console.log(e);
    renderItems(inputValue);
  }
});
