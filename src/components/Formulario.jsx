import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { useFormulario } from "../hooks/useFormulario";

const Formulario = ({agregatTodo}) => {

    const initialState = {
        nombre: '',
        descripcion: '',
        estado: 'pendiente',
        prioridad: false
    }

    const [inputs, handleChange, reset] = useFormulario(initialState)

    const {nombre, descripcion, estado, prioridad} = inputs;

    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        if(!nombre.trim()){
            console.log('no dejar en blanco');
            e.target[0].focus();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El nombre no puede ser vacío',
              });
            return
        }
        if(!descripcion.trim()){
            e.target[1].focus();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La descripción no puede estar vacía',
              });
            return
        }
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Datos guardados con éxito',
          });
        agregatTodo({
            nombre: nombre,
            descripcion: descripcion,
            estado: estado === 'pendiente' ? false : true,
            prioridad: prioridad,
            id: uuidv4()
        })
        
        reset()
    }

    return (
        <>
            <h3>Agregar TODO</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    className="form-control mb-2"
                    name="nombre"
                    placeholder="Ingrese todo nombre"
                    value={nombre}
                    onChange={handleChange}
                />
                <textarea
                    className="form-control mb-2"
                    placeholder="Ingrese todo descripcion" 
                    name="descripcion"  
                    cols="30" 
                    rows="10"
                    value={descripcion}
                    onChange={handleChange}
                />
                <select 
                    name="estado" 
                    className="form-control mb-2"
                    value={estado}
                    onChange={handleChange}
                >
                    <option value="pendiente">Pendiente</option>
                    <option value="completado">Completado</option>
                </select>
                <div className="form-check">
                    <input 
                        className="form-check-input" 
                        type="checkbox"
                        onChange={handleChange}
                        id="flexCheckDefault"
                        name="prioridad"
                        value={prioridad}
                    />
                    <label 
                        className="form-check-label" 
                        htmlFor="flexCheckDefault"
                    >
                        Set priority
                </label>
                </div>
                <button type="submit" className="btn btn-primary">Agregar</button>
            </form>
        </>
    )
}

export default Formulario
