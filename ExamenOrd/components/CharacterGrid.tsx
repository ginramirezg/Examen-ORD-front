import { FunctionalComponent } from "preact";
import { hpAPI } from "../routes/types.ts";

export const CharacterGrid:FunctionalComponent<{data:hpAPI}> = (props) =>{


    return(
        <div>
            
            <img src={props.data.image}></img>
            <a href={`character/${props.data.id}`}>
                {props.data.name}
            </a>
            
        </div>
    )
}