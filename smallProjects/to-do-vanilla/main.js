// Modulacion del objeto
function crearTareaObjeto(texto){
  return{
    id: crypto.randomUUID(),//Generamos un id unico,
    texto: texto,
    creada: new Date().toISOString(),
    completada:false,
    completadaEn:null
  };
};

function renderizarTarea(tarea){
    const item = document.createElement('li');
    item.classList.add('tarea');
    if (tarea.completada)item.classList.add('completada');

    const texto = document.createElement('span');
    texto.textContent = tarea.texto;

    const fecha = document.createElement('small');
    const fechaCreacion = new Date(tarea.creada).toLocaleString();
    fecha.textContent = `Creada ${fechaCreacion}`;
    
    // Si la tarea esta completada
    
    // Evento para alternar estado
    texto.addEventListener('click',()=>{
        tarea.completada = !tarea.completada;
        tarea.completadaEn = tarea.completada ? new Date().toISOString():null;
        guardarTarea();
        actualizarLista();
    });
    
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.classList.add('eliminar');
    
    btnEliminar.addEventListener('click',()=>{
        tareas = tareas.filter(t => t.id !== tarea.id);
        guardarTarea();
        actualizarLista();
    });

    item.appendChild(texto);
    item.appendChild(fecha);
    if(tarea.completadaEn){
        const fechaFin = document.createElement('small');
        const finalizada = new Date(tarea.completadaEn).toLocaleString();
        fechaFin.textContent = `✔️ Completada: ${fechaCreacion}`;
        item.appendChild(fechaFin);
    }
    item.appendChild(btnEliminar);
    list.appendChild(item);
};

function guardarTarea(){
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function actualizarLista(){
    list.innerHTML = ''; //limpiamos
    tareas.forEach(renderizarTarea);
    const taskCount = tareas.reduce((acc,tr)=>{
        if (!tr.completada) acc++;
        return acc;
    },0);
    if (taskCount){
        taskCountSpan.textContent = `Pendientes ${taskCount}`;
    }else{
        taskCountSpan.textContent = '';
    }

}

// Captura de campos
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const taskSection = document.getElementById('tareas');
const taskCountSpan = document.getElementById('task-count');

let tareas = [];
const tareasGuardadas = localStorage.getItem('tareas');

if (tareasGuardadas){
    tareas = JSON.parse(tareasGuardadas);
    tareas.forEach(element => {
        // crearTareaObjeto(element);
        actualizarLista();
    });
    console.table(tareas);
    
    // actualizarLista()
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const texto = input.value.trim();
    if(texto){
        const nuevaTarea = crearTareaObjeto(texto);
        tareas.push(nuevaTarea);
        guardarTarea();
        actualizarLista();
        input.value = '';
    }
});






