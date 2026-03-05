// === ГАЛЕРЕЯ ТРОФЕЕВ С СОХРАНЕНИЕМ И ДОСТУПОМ ВЛАДЕЛЬЦА ===


const IS_OWNER = true; 

const STORAGE_KEY = 'anglersbook_trophies';

document.addEventListener('DOMContentLoaded', () => {
  const imageInput = document.getElementById('trophyImage');
  const captionInput = document.getElementById('trophyCaption');
  const addBtn = document.getElementById('addTrophyBtn');
  const gallery = document.getElementById('trophyGallery');
  const uploadSection = document.querySelector('.trophy-upload');

  
  if (!IS_OWNER && uploadSection) {
    uploadSection.style.display = 'none';
  }

  
  loadTrophies();

  if (IS_OWNER && addBtn) {
    addBtn.addEventListener('click', () => {
      const file = imageInput.files[0];
      const caption = captionInput.value.trim();

      if (!file) {
        alert('Выберите фотографию!');
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        const trophy = {
          id: Date.now(),
          img: e.target.result,
          caption: caption || 'Без подписи'
        };

        saveTrophy(trophy);
        renderTrophy(trophy, true);

        imageInput.value = '';
        captionInput.value = '';
      };

      reader.readAsDataURL(file);
    });
  }
});

// === LOCALSTORAGE ===

function loadTrophies() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  data.forEach(trophy => renderTrophy(trophy, false));
}

function saveTrophy(trophy) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  data.unshift(trophy);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function deleteTrophy(id) {
  let data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  data = data.filter(t => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// === ОТРИСОВКА КАРТОЧКИ ===

function renderTrophy(trophy, prepend) {
  const gallery = document.getElementById('trophyGallery');

  const card = document.createElement('div');
  card.className = 'trophy-card';

  card.innerHTML = `
    ${IS_OWNER ? '<button class="trophy-delete" title="Удалить">✕</button>' : ''}
    <img src="${trophy.img}" alt="Трофей">
    <div class="caption">${trophy.caption}</div>
  `;

  if (IS_OWNER) {
    card.querySelector('.trophy-delete').addEventListener('click', () => {
      if (confirm('Удалить этот трофей?')) {
        deleteTrophy(trophy.id);
        card.remove();
      }
    });
  }

  if (prepend) {
    gallery.prepend(card);
  } else {
    gallery.appendChild(card);
  }
}