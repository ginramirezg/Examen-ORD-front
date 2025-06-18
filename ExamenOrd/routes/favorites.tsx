import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std@0.224.0/http/cookie.ts";
import Axios from "npm:axios";
import { hpAPI } from "./types.ts";
import { CharacterCont } from "../components/CharacterCont.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const cookies = getCookies(req.headers);
    const ids = cookies.favoritos ? cookies.favoritos.split(",") : [];

    const requests = await Promise.all(
      ids.map((id) =>
        Axios.get<hpAPI[]>(`https://hp-api.onrender.com/api/character/${id}`)
      )
    );

    const personajes = requests.map((res) => res.data[0]);
    return ctx.render(personajes);
  },
};

const Page = (props: PageProps<hpAPI[]>) => (
  <div>
    
    {props.data.length === 0 && <p>No tienes favoritos aún</p>}
    {props.data.map((char) => (
      <div key={char.id}>
        <CharacterCont data={char} />

        <form method="POST" action={`/character/${char.id}`}>
          <input type="hidden" name="action" value="remove" />
          <input type="hidden" name="id" value={char.id} />
          <button type="submit"> Quitar de favoritos</button>
        </form>
      </div>
    ))}
  </div>
);

export default Page;
