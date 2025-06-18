import { FunctionalComponent } from "preact";
import { hpAPI } from "../routes/types.ts";

export const CharacterCont: FunctionalComponent<{data: hpAPI}> = (props) =>{
    const datos = props.data
    let status = ""
  

    if(datos.alive === true ){
        status = "Vivo"
    }
    else{
        status = "Muerto"
    }

    return(
        <div class="personaje-card">
           
            <img src={datos.image}></img>
            <h3>{datos.name}</h3>
            <p>Casa: {datos.house}</p>
            <p>{status}</p>
            
        </div>
    )
}