function loadContent(page) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      document.getElementById('content').innerHTML = this.responseText;
      if (page === 'admin') {
        initializeAdminPage();
      } else if (page === 'gallery') {
        loadGallery();
      }
    }
  };
  xhttp.open('GET', page + '.html', true);
  xhttp.send();
}

function initializeAdminPage() {
  const fileInput = document.getElementById('foto');
  const previewContainer = document.getElementById('preview-container');

  fileInput.addEventListener('change', function() {
    const files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = function(event) {
        const imageUrl = event.target.result;

        
        const title = prompt('Enter the title for the image:');
        const text = prompt('Enter the text for the image:');
        const imageItem = createImageItem(imageUrl, title, text, previewContainer, true);
        previewContainer.appendChild(imageItem);
        saveImage(imageUrl, title, text);
      };

      reader.readAsDataURL(file);
    }
  });

  displaySavedImages(previewContainer, true);
}

function createImageItem(imageUrl, title, text, previewContainer, isAdminPage) {
  const imageItem = document.createElement('div');
  imageItem.className = 'image-item';

  imageItem.style.width = '200px';
  imageItem.style.height = '600px';
  imageItem.style.margin = '10px';
  imageItem.style.border = '5px solid gold';
  imageItem.style.textAlign = 'center';
  imageItem.style.backgroundColor = 'white';

  const previewImage = document.createElement('img');
  previewImage.src = imageUrl;
  previewImage.style.width = '100%'; 
  previewImage.style.height = 'auto'; 
  imageItem.appendChild(previewImage);

  const imageTitle = document.createElement('h3');
  imageTitle.innerText = title;
  imageItem.appendChild(imageTitle);

  const imageText = document.createElement('p');
  imageText.innerText = text;
  imageText.style.maxHeight = '0';
  imageText.style.overflow = 'hidden';
  imageText.style.transition = 'max-height 0.5s ease';
  imageText.style.wordWrap = 'break-word';
  imageText.style.boxSizing = 'border-box';
  imageItem.appendChild(imageText);

  const buttonContainer = document.createElement('div');
  buttonContainer.style.display = 'flex';
  buttonContainer.style.justifyContent = 'center';
  buttonContainer.style.alignItems = 'center';
  buttonContainer.style.marginTop = '10px';

  if (isAdminPage) {
    const editButton = document.createElement('button');
    editButton.innerText = 'Editar';
    editButton.addEventListener('click', function() {
      editImage(imageItem, previewContainer);
    });
    buttonContainer.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Eliminar';
    deleteButton.addEventListener('click', function() {
      deleteImage(imageItem, previewContainer);
    });
    buttonContainer.appendChild(deleteButton);
  } else {
    const readMoreButton = document.createElement('button');
    readMoreButton.innerText = 'Leer más';
    readMoreButton.addEventListener('click', function() {
      toggleText(imageText, readMoreButton, imageItem);
      adjustStylesToText(imageText, imageItem); 
    });
    buttonContainer.appendChild(readMoreButton);
  }

  imageItem.appendChild(buttonContainer);

  return imageItem;
}

function saveImage(imageUrl, title, text) {
  const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
  savedImages.push({ imageUrl, title, text });
  localStorage.setItem('savedImages', JSON.stringify(savedImages));
}

function deleteImage(imageItem, previewContainer) {
  const imageUrl = imageItem.querySelector('img').src;
  const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
  const index = savedImages.findIndex(imageData => imageData.imageUrl === imageUrl);
  if (index > -1) {
    savedImages.splice(index, 1);
    localStorage.setItem('savedImages', JSON.stringify(savedImages));
    previewContainer.removeChild(imageItem);
  }
}

function editImage(imageItem, previewContainer) {
  const imageUrl = imageItem.querySelector('img').src;
  const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
  const index = savedImages.findIndex(imageData => imageData.imageUrl === imageUrl);
  if (index > -1) {
    const imageData = savedImages[index];
    const { title, text } = imageData;

    const newTitle = prompt('Enter the new title for the image:', title);
    const newText = prompt('Enter the new text for the image:', text);

    imageData.title = newTitle;
    imageData.text = newText;
    localStorage.setItem('savedImages', JSON.stringify(savedImages));

    imageItem.querySelector('h3').innerText = newTitle;
    imageItem.querySelector('p').innerText = newText;
  }
}

function displaySavedImages(previewContainer, isAdminPage) {
  const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];

  savedImages.forEach(imageData => {
    const { imageUrl, title, text } = imageData;
    const imageItem = createImageItem(imageUrl, title, text, previewContainer, isAdminPage);
    previewContainer.appendChild(imageItem);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  let navLinks = document.querySelectorAll('nav ul li a');
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function(e) {
      e.preventDefault();
      let page = this.getAttribute('href').substring(1);
      loadContent(page);
    });
  }
});

//------GALLERY
function loadGallery() {
  function displaySavedImages() {
    const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
    const galleryContainer = document.getElementById('gallery-container');

    savedImages.forEach(imageData => {
      const { imageUrl, title, text } = imageData;
      const imageItem = createImageItem(imageUrl, title, text, galleryContainer, false);
      galleryContainer.appendChild(imageItem);
    });
  }

  displaySavedImages();
}

function toggleText(imageText, readMoreButton, imageItem) {
  if (imageText.style.maxHeight === '0px') {
    imageText.style.maxHeight = '900px';
    imageItem.style.borderBottom = '5px solid gold';
    readMoreButton.innerText = 'Leer menos';
  } else {
    imageText.style.maxHeight = '0px';
    imageItem.style.borderBottom = 'none';
    readMoreButton.innerText = 'Leer más';
  }
}

function adjustStylesToText(imageText, imageItem) {
  setTimeout(function() {
    const textHeight = imageText.scrollHeight;
    const backgroundColor = getComputedStyle(imageItem).backgroundColor;
    const color = getComputedStyle(imageItem).color;

    imageItem.style.height = textHeight + 'px';
    imageItem.style.border = '5px solid gold';
    imageItem.style.height = '600px'
    imageItem.style.backgroundColor = '600px';
    imageItem.style.color = 'black';
  }, 0);
}






