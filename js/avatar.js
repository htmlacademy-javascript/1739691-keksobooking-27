const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const uploadAvatar = document.querySelector('.ad-form-header__upload input[type=file]');
const preview = document.querySelector('.ad-form-header__preview img');
const uploadAppartPhoto = document.querySelector('.ad-form__upload input[type=file]');
const appartPhotoContainer = document.querySelector('.ad-form__photo');

const setUploadAvatar = () => {
  uploadAvatar.addEventListener('change', () => {
    const file = uploadAvatar.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      preview.src = URL.createObjectURL(file);
    }
  });
};

const setUploaAppartPhoto = () => {
  uploadAppartPhoto.addEventListener('change', () => {
    const file = uploadAppartPhoto.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const image = document.createElement('img');

      appartPhotoContainer.innerHTML = '';
      appartPhotoContainer.append(image);

      image.src = URL.createObjectURL(file);
      image.style.width = '100%';
    }
  });
};

const resetPhotos = () => {
  appartPhotoContainer.innerHTML = '';
  preview.src = DEFAULT_AVATAR;
};

export {setUploadAvatar, setUploaAppartPhoto, resetPhotos};
