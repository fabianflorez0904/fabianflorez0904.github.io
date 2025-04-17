// Conexion al Api
fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        renderCharacters(data.results);
    })
    .catch(error=>{
        console.log("Ocurrio un error:", error);
        
    });

function renderCharacters(personajes){
    const containerCharacters = document.getElementById('character-list');
    containerCharacters.innerHTML = '';

    personajes.forEach(personaje => {
        // Cramos la tarjeta donde va a ir el personaje
        const charCardDiv = document.createElement('div');
        charCardDiv.classList.add('character-card');
        
        containerCharacters.appendChild(charCardDiv);

        // creamos la imagen
        const charImageDiv = document.createElement('div');
        charImageDiv.classList.add('character-image');

        const img = document.createElement('img');
        img.src = personaje.image;
        img.alt = `Foto del personaje ${personaje.name}`;
        img.classList.add('character-img');

        charImageDiv.appendChild(img);
        charCardDiv.appendChild(charImageDiv);

        // Creamos el div donde va a ir la informacion
        const infoChar = document.createElement('div');
        infoChar.classList.add('character-info');
        //<h2 class="character-name">Rick Sanchez</h2>
        const nameChar = document.createElement('h2');
        nameChar.classList.add('character-name');
        nameChar.textContent = personaje.name;
        
        infoChar.appendChild(nameChar);
        charCardDiv.appendChild(infoChar);

        const charStatusDiv = document.createElement('div');
        charStatusDiv.classList.add('character-status-container');
        const charStatusIndiSpan = document.createElement('span');
        charStatusIndiSpan.classList.add('status-indicator');
        charStatusIndiSpan.classList.add(personaje.status.toLowerCase());
        
        const charStatusTextSpan = document.createElement('span');
        charStatusTextSpan.classList.add('status-text');
        charStatusTextSpan.textContent = personaje.status;

        charStatusDiv.appendChild(charStatusIndiSpan);
        charStatusDiv.appendChild(charStatusTextSpan);

        infoChar.appendChild(charStatusDiv);

        const charDetailsDiv = document.createElement('div');
        charDetailsDiv.classList.add('character-details');


        // 1. Especie
        const especieItem = document.createElement('div');
        especieItem.classList.add('detail-item');

        const especieLabel = document.createElement('span');
        especieLabel.classList.add('detail-label');
        especieLabel.textContent = 'Especie: ';

        const especieValor = document.createElement('span');
        especieValor.classList.add('detail-value');
        especieValor.textContent = personaje.species;

        especieItem.appendChild(especieLabel);
        especieItem.appendChild(especieValor);
        charDetailsDiv.appendChild(especieItem);

        // 2. Genero
        const generoItem = document.createElement('div');
        generoItem.classList.add('detail-item');
        const generoLabel = document.createElement('span');
        generoLabel.classList.add('detail-label');
        generoLabel.textContent = 'Genero: ';
        const generoValor = document.createElement('span');
        generoValor.classList.add('detail-value');
        generoValor.textContent = personaje.gender;

        generoItem.appendChild(generoLabel);
        generoItem.appendChild(generoValor);
        charDetailsDiv.appendChild(generoItem);


        // 3. Origen
        const origenItem = document.createElement('div');
        origenItem.classList.add('detail-item');
        const origenLabel = document.createElement('span');
        origenLabel.classList.add('detail-label');
        origenLabel.textContent = 'Origen: ';
        const origenValor = document.createElement('span');
        origenValor.classList.add('detail-value');
        origenValor.textContent = personaje.origin.name;

        origenItem.appendChild(origenLabel);
        origenItem.appendChild(origenValor);
        charDetailsDiv.appendChild(origenItem);

        // 4. Ubicación
        const ubicacionItem = document.createElement('div');
        ubicacionItem.classList.add('detail-item');
        const ubicacionLabel = document.createElement('span');
        ubicacionLabel.classList.add('detail-label');
        ubicacionLabel.textContent = 'Ubicación: ';
        const ubicacionValor = document.createElement('span');
        ubicacionValor.classList.add('detail-value');
        ubicacionValor.textContent = personaje.location.name;

        ubicacionItem.appendChild(ubicacionLabel);
        ubicacionItem.appendChild(ubicacionValor);
        charDetailsDiv.appendChild(ubicacionItem);

        infoChar.appendChild(charDetailsDiv);

        // <div class="character-episodes">
        //     <span class="episodes-count">Appears in 51 episodes</span>
        // </div>

        const charEpisodesDiv = document.createElement('div');
        charEpisodesDiv.classList.add('character-episodes');

        const episodesCount = document.createElement('span');
        episodesCount.classList.add('episodes-count');
        const numEpisodios = personaje.episode.length;
        episodesCount.textContent = `Appears in ${numEpisodios} ${numEpisodios === 1?'episode':'episodes'}`;

        
        charEpisodesDiv.appendChild(episodesCount);

        infoChar.appendChild(episodesCount);


    });
}

    