import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios"
import { hpAPI } from "./types.ts";
import { CharacterGrid } from "../components/CharacterGrid.tsx";

export const handler:Handlers = {
  async GET(_req: Request, ctx: FreshContext){
    const responseAPI = await Axios.get<hpAPI[]>("https://hp-api.onrender.com/api/characters")
    const characters = responseAPI.data

    return ctx.render(characters)
  },
 
}

const Page = (props: PageProps<hpAPI[]>) => (
  <div class="personaje-grid">

  {props.data.map((ch)=>(
    <div key={ch.id}>
    <CharacterGrid data ={ch}></CharacterGrid>
    </div>
  ))}
  
  </div>
)

export default Page;