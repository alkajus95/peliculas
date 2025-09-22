// // Función para obtener un Pokémon aleatorio
// async function getPokemon() {
// 	const pokeResult = document.getElementById('pokeResult');
// 	pokeResult.textContent = 'Cargando...';
// 	// Elige un ID aleatorio entre 1 y 151 (primera generación)
// 	const id = Math.floor(Math.random() * 151) + 1;
// 	try {
// 		const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
// 		const data = await res.json();
// 		pokeResult.innerHTML = `<strong>${data.name.toUpperCase()}</strong><br><img src="${data.sprites.front_default}" alt="${data.name}">`;
// 	} catch (err) {
// 		pokeResult.textContent = 'Error al obtener el Pokémon.';
// 	}
// }

// // Función para obtener un consejo aleatorio
// async function getAdvice() {
// 	const adviceResult = document.getElementById('adviceResult');
// 	adviceResult.textContent = 'Cargando...';
// 	try {
// 		const res = await fetch('https://api.adviceslip.com/advice');
// 		const data = await res.json();
// 		adviceResult.textContent = data.slip.advice;
// 	} catch (err) {
// 		adviceResult.textContent = 'Error al obtener el consejo.';
// 	}
// }

// // Función para obtener un chiste de Chuck Norris
// async function getChuckJoke() {
// 	const chuckResult = document.getElementById('chuckResult');
// 	chuckResult.textContent = 'Cargando...';
// 	try {
// 		const res = await fetch('https://api.chucknorris.io/jokes/random');
// 		const data = await res.json();
// 		chuckResult.innerHTML = `${data.value}`;
// 	} catch (err) {
// 		chuckResult.textContent = 'Error al obtener el chiste.';
// 	}
// }

// // Asignar eventos a los botones
// document.getElementById('pokeBtn').addEventListener('click', getPokemon);
// document.getElementById('adviceBtn').addEventListener('click', getAdvice);
// document.getElementById('chuckBtn').addEventListener('click', getChuckJoke);

document.getElementById('send').addEventListener('click', ()=>{
    const pelicula={
        imagen: document.getElementById('imagen').value,
        name: document.getElementById('nombre').value,
        genero: document.getElementById('genero').value,
        año: document.getElementById('año').value
    }
    fetch('https://68c20740f9928dbf33ed3483.mockapi.io/cx8/pelicula', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pelicula)
    })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            const formSection = document.getElementById('formulario');
            if(formSection) formSection.style.display = 'none';
            getElements();
        })
        .catch((error)=>console.error('error', error));
});

function getElements(){
    fetch('https://68c20740f9928dbf33ed3483.mockapi.io/cx8/pelicula')
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        const container = document.getElementById('container');
        if (container) container.innerHTML = '';
        data.forEach(pelicula => {
            const card = document.createElement('div');
            card.className = 'pelicula-card';
            card.innerHTML = `
                <h2>${pelicula.name}</h2>
                <img src="${pelicula.imagen}" alt="${pelicula.name}" style="max-width:200px;">
                <p><strong>Género:</strong> ${pelicula.genero}</p>
                <p><strong>Año:</strong> ${pelicula.año}</p>
                <button class="delete-btn">Eliminar</button>
                <button class="edit-btn">Modificar</button>
            `;
            card.querySelector('.delete-btn').addEventListener('click', async () => {
                await fetch(`https://68c20740f9928dbf33ed3483.mockapi.io/cx8/pelicula/${pelicula.id}`, {
                    method: 'DELETE'
                });
                getElements();
            });
            card.querySelector('.edit-btn').addEventListener('click', async () => {
                const nuevoNombre = prompt('Nuevo nombre:', pelicula.name);
                const nuevoGenero = prompt('Nuevo género:', pelicula.genero);
                const nuevoAño = prompt('Nuevo año:', pelicula.año);
                const nuevaImagen = prompt('Nueva imagen:', pelicula.imagen);
                if(nuevoNombre && nuevoGenero && nuevoAño && nuevaImagen){
                    await fetch(`https://68c20740f9928dbf33ed3483.mockapi.io/cx8/pelicula/${pelicula.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: nuevoNombre,
                            genero: nuevoGenero,
                            año: nuevoAño,
                            imagen: nuevaImagen
                        })
                    });
                    getElements();
                }
            });
            if (container) {
                container.appendChild(card);
            } else {
                document.body.appendChild(card);
            }
        });
    })
    .catch((error)=>console.error('error', error));
}