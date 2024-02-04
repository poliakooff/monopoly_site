const photoItems = document.querySelectorAll('.photo__item');
const photoFrame = document.querySelector('.photo__frame');
const btnArrowBack = document.querySelector('.photo__arrow-back');
const btnArrowNext = document.querySelector('.photo__arrow-next');
let currentIndex = 0;
photoItems.forEach((item, index) => {
  item.addEventListener('click', function () {
    if (this.classList.contains('active')) return;
    changeImage(index);
  });
});
btnArrowBack.addEventListener('click', function () {
  currentIndex = (currentIndex - 1 + photoItems.length) % photoItems.length;
  changeImage(currentIndex);
});
btnArrowNext.addEventListener('click', function () {
  currentIndex = (currentIndex + 1) % photoItems.length;
  changeImage(currentIndex);
});
function changeImage(index) {
  photoItems.forEach((item) => {
    item.classList.remove('active');
  });
  photoItems[index].classList.add('active');
  const imgSrc = photoItems[index].querySelector('img').getAttribute('src');
  const imgAlt = photoItems[index].querySelector('img').getAttribute('alt');
  const modifiedImgSrc = imgSrc.replace('mini', 'big');

  const imgWidth = photoFrame.querySelector('img').getAttribute('width');
  const imgHeight = photoFrame.querySelector('img').getAttribute('height');

  const imgElement = document.createElement('img');
  imgElement.src = modifiedImgSrc;
  imgElement.width = imgWidth;
  imgElement.height = imgHeight;
  imgElement.loading = 'lazy';
  imgElement.classList = 'active';
  imgElement.alt = imgAlt;

  photoFrame.innerHTML = '';
  photoFrame.appendChild(imgElement);

  currentIndex = index;
}

document.addEventListener('DOMContentLoaded', function () {
  window.onload = function () {
    var preloader = document.getElementById('preloader');
    preloader.classList.add('preloader__hide');
  };
});

const buttons = document.querySelectorAll('.button__buy');

const modal = document.querySelector('#modal');

buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    modal.style.display = 'flex';
    modal.style.opacity = '1';
  });
});

modal.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    if (modal.style.display === 'flex') {
      modal.style.display = 'none';
    }
  }
});

const choiceContainer = document.querySelector('.modal__choice');

function updateHiddenInput(event) {
  if (event.target.type === 'radio') {
    const name = event.target.name;
    const value = event.target.value;

    const hiddenInput = document.querySelector(
      `#formSubmit input[type="hidden"][id="${name}"]`
    );
    if (hiddenInput) {
      hiddenInput.value = value;
    }
  }
}

choiceContainer.addEventListener('change', updateHiddenInput);

const form = document.getElementById('formSubmit');
const submitButton = form.querySelector('input[type="submit"]');

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);

  fetch('php/register.php', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok, status: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      if (data.success) {
        submitButton.value = 'Відправлено';
        submitButton.style.background = '#4CAF50';
        modal.style.opacity = '0';

        setTimeout(() => {
          modal.style.display = 'none';
        }, 1000);
      } else {
        submitButton.value = 'Не працює';
        // console.error('Server Error:', data.message);
      }
    })
    .catch((error) => {
      // console.error('Error:', error);
      submitButton.value = 'Не працює';

      modal.style.opacity = '0';

      setTimeout(() => {
        modal.style.display = 'none';
      }, 1000);
    });

  fetch('php/telegram.php', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Ошибка (telegram.php): Не удалось отправить данные на сервер! Статус: ${response.status}`
        );
      }
      return response.text();
    })
    .then((responseText) => {
      // console.log(
      //   'Успех (telegram.php): Данные успешно отправлены на сервер!',
      //   responseText
      // );
    })
    .catch((error) => {
      // console.error('Ошибка (telegram.php):', error.message);
    });
}

form.addEventListener('submit', handleFormSubmit);
const socialContainer = document.querySelector('.contact__social');

socialContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('social__link')) {
    const url = event.target.getAttribute('data-link');

    window.open(url, '_blank');
  }
});
