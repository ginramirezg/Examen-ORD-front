import { Handlers, FreshContext, PageProps } from '$fresh/server.ts';


import { hpAPI } from "../types.ts";
import Axios from "npm:axios"
import { CharacterCont } from "../../components/CharacterCont.tsx";


import { getCookies, setCookie } from "https://deno.land/std@0.224.0/http/cookie.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { id } = ctx.params;
    

    const request = await Axios.get<hpAPI[]>(`https://hp-api.onrender.com/api/character/${id}`);
    const personaje = request.data[0]

    
    return ctx.render(personaje);
  },
  async POST(req, ctx) {
    const formData = await req.formData();
    const action = formData.get("action");
    const charId = formData.get("id")?.toString();

    const headers = new Headers();
    const cookies = getCookies(req.headers);
    const favoritos = cookies.favoritos ? cookies.favoritos.split(",") : [];

    let nuevosFavoritos = favoritos;

    if (action === "add" && charId && !favoritos.includes(charId)) {
      nuevosFavoritos = [...favoritos, charId];
    } else if (action === "remove" && charId) {
      nuevosFavoritos = favoritos.filter((id) => id !== charId);
    }

    setCookie(headers, {
      name: "favoritos",
      value: nuevosFavoritos.join(","),
      path: "/",
      httpOnly: true,
    });

    headers.set("location", `/character/${charId}`);
    return new Response(null, { status: 302, headers });
  }
}




const Page = (props: PageProps<hpAPI>) => {
  return (
    <div>
      <h3>{props.data.name}</h3>
      <CharacterCont data={props.data} />

    <div style={{ display: "flex", gap: "1rem" }}>
      <form method="POST">
        <input type="hidden" name="action" value="add" />
        <input type="hidden" name="id" value={props.data.id} />
        <button type="submit">⭐</button>
      </form>

      <form method="POST">
        <input type="hidden" name="action" value="remove" />
        <input type="hidden" name="id" value={props.data.id} />
        <button type="submit">❌</button>
      </form>
    </div>
    </div>
  );
};

export default Page; 