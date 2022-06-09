const uri = 'api/songs';
let songs = [];

function getItems() {
    fetch(uri)
        .then(response => response.json()) 
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

/*function searchSong() {
    var foundSong = [];
    songName = document.getElementById('search-name');

    for (song in songs) {
        if (song.name == songName){
            foundSong.push(song);
        }
    }
}
*/
function addItem() {
    const addNameTextbox = document.getElementById('add-name');
    const addArtistTextbox = document.getElementById('add-artist');
    const addAlbumTextbox = document.getElementById('add-album');

    const item = {
        name: addNameTextbox.value.trim(),
        artistId: addArtistTextbox.value.trim(),
        albumId: addAlbumTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
            addArtistTextbox.value = '';
            addAlbumTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = songs.find(item => item.id === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-artist').value = item.artistId;
    document.getElementById('edit-album').value = item.albumId;
    document.getElementById('edit-id').value = item.id;
    
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        name: document.getElementById('edit-name').value.trim(),
        artistId: document.getElementById('edit-artist').value.trim(),
        albumId: document.getElementById('edit-album').value.trim()
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}


function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'song' : 'songs';

//    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('songs');
    tBody.innerHTML = '';

   // _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete;

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(item.name);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let textNode2 = document.createTextNode(item.artistId);
        td2.appendChild(textNode2);

        let td3 = tr.insertCell(2);
        let textNode3 = document.createTextNode(item.albumId);
        td3.appendChild(textNode3);

        let td4 = tr.insertCell(3);
        td4.appendChild(editButton);

        let td5 = tr.insertCell(4);
        td5.appendChild(deleteButton);
    });

    songs = data;
}