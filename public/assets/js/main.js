document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formularioDeporte');
    const nombreInput = document.getElementById('nombre');
    const precioInput = document.getElementById('precio'); 
    

   //Solicitud POST
    formulario.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const nombre = nombreInput.value;
        const precio = precioInput.value;

        try {          

            const response = await axios.post('/agregar', { nombre, precio });

            if (response.status == 200) {
                console.log('Deporte agregadocorrectamente', response);                                                  
                window.location.href = '/agregar';
            } else {
                console.error('Error al agregar el deporte:');
            }
           
        } catch (error) {
            console.error('Error al agregar');
        }
    });

    //Enontrar el formulario de editar para mostraRLO
    document.querySelectorAll('.btn-editar').forEach((btnEditar) => {
        btnEditar.addEventListener('click', () => {           
           
           const deporteId = btnEditar.closest('tr').dataset.id;
           console.log(deporteId)           
           const editarForm = document.querySelector(`.editar-form[data-id="${deporteId}"]`);
           console.log(editarForm)
          
            if (editarForm) {
                editarForm.style.display = 'block';
            } else {
                console.error('Elemento de formulario de edición no encontrado');
            }
        });
    });

    //Solicitud PUT    
    document.querySelectorAll('.form-editar-precio').forEach((formEditar) => {
        formEditar.addEventListener('submit', async (event) => {
            event.preventDefault();
            const nuevoPrecio = formEditar.querySelector('input[name="nuevoPrecio"]').value;
            console.log(nuevoPrecio)
            const deporteId = formEditar.closest('tr').dataset.id
            console.log(deporteId)
            
            try {
                const response = await axios.put(`/editar/${deporteId}`, { precio: nuevoPrecio });
                if (response.status === 200) {
                   window.location.reload(); 
                } else {
                    console.error('Error al editar el precio del deporte');
                }
            } catch (error) {
                console.error('Error al editar el precio del deporte:', error);
            }
        });
    });

    //Solicitud DELETE
    document.querySelectorAll('.btn-eliminar').forEach(btn =>{
        btn.addEventListener('click', async() =>{
            const id = btn.closest('tr').dataset.id
            console.log(id)

            try{
                const response = await axios.delete(`/eliminar/${id}`)
                if(response.status === 200){
                    console.log("Deporte Eliminado Correctamente")
                    window.location.reload();
                }else{
                    console.error('Error al eliminar el deporte');
                }
            }catch (error){
                console.error('Error al eliminar el deporte:', error);
            }
        })
    })


});

