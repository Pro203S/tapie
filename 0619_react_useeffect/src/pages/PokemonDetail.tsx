/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function PokemonDetail() {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState<any>(null);

    useEffect(() => {
        (async () => {
            const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await r.json();

            setPokemon(data);
        })();
    }, []);

    if (!pokemon) {
        return <p>로딩중..</p>;
    }

    return <div>
        <h1>name: {name}</h1>

        <img src={pokemon.sprites.front_default} alt={pokemon.name} />

        <p>키: {pokemon.height}</p>
        <p>무게: {pokemon.weight}</p>
        
        <p>타입: {pokemon.types.map((v: any) => v.type.name)}</p>
    </div>;
}