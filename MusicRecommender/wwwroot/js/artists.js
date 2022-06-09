const uriArt  = 'api/artists';
let artists = [];

function getArtists() {
    fetch(uriArt)
        .then(response => response.json())
        .then(data => _displayArtists(data))
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
function addArtist() {
    const addNameTextbox = document.getElementById('add-name-artist');
    const addLableTextbox = document.getElementById('add-lable-artist');
    const addGenreTextbox = document.getElementById('add-genre-artist');

    const item = {
        stageName: addNameTextbox.value.trim(),
        lable: addLableTextbox.value.trim(),
        genre: addGenreTextbox.value.trim()
    };

    fetch(uriArt, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getArtists();
            addNameTextbox.value = '';
            addLableTextbox.value = '';
            addGenreTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteArtist(id) {
    fetch(`${uriArt}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getArtists())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditFormArtist(id) {
    const item = artists.find(item => item.id === id);

    document.getElementById('edit-name-artist').value = item.stageName;
    document.getElementById('edit-label-artist').value = item.lable;
    document.getElementById('edit-genre-artist').value = item.genre;
    document.getElementById('edit-id-artist').value = item.id;

    document.getElementById('editFormArtist').style.display = 'block';
}

function updateArtist() {
    const itemId = document.getElementById('edit-id-artist').value;
    const item = {
        id: parseInt(itemId, 10),
        stageName: document.getElementById('edit-name-artist').value.trim(),
        lable: document.getElementById('edit-label-artist').value.trim(),
        genre: document.getElementById('edit-genre-artist').value.trim()
    };

    fetch(`${uriArt}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getArtists())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInputArtists() {
    document.getElementById('editFormArtist').style.display = 'none';
}


function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'song' : 'songs';

    //    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayArtists(data) {
    const tBody = document.getElementById('artists');
    tBody.innerHTML = '';

    // _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(x => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditFormArtist(${x.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteArtist(${x.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(x.stageName);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let textNode2 = document.createTextNode(x.lable);
        td2.appendChild(textNode2);

        let td3 = tr.insertCell(2);
        let textNode3 = document.createTextNode(x.genre);
        td3.appendChild(textNode3);

        let td4 = tr.insertCell(3);
        td4.appendChild(editButton);

        let td5 = tr.insertCell(4);
        td5.appendChild(deleteButton);
    });

    artists = data;
}