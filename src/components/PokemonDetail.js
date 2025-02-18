import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PokemonDetail = () => {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        const fetchPokemonDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/pokemons/${name}`);
                console.log("Full Response:", response.data); // Log the response for debugging

                // Dynamically check for expected structure
                if (response?.data?.name) {
                    setPokemon(response.data); // Assuming response.data is the Pokémon detail object
                } else {
                    throw new Error("Unexpected response structure. Check API response format.");
                }
            } catch (error) {
                console.error("Error fetching Pokémon detail:", error);
                setError("Failed to load Pokémon details.");
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonDetail();
    }, [name]);

    if (loading) return <div style={styles.loading}>Loading...</div>;

    if (error) return <div style={styles.error}>{error}</div>;

    if (!pokemon) return <div style={styles.noPokemon}>No Pokémon found</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{pokemon.name}</h1>
            <img style={styles.image} src={pokemon.sprites?.front_default} alt={pokemon.name} />
            <p style={styles.info}>Weight: {pokemon.weight}</p>
            <p style={styles.info}>Height: {pokemon.height}</p>
            <h3 style={styles.subtitle}>Abilities:</h3>
            <ul style={styles.abilitiesList}>
                {pokemon.abilities?.map((ability) => (
                    <li style={styles.abilityItem} key={ability.ability.name}>{ability.ability.name}</li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: "'Arial', sans-serif",
        backgroundColor: '#f0f4f8',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        margin: '20px auto',
        textAlign: 'center',
    },
    title: {
        color: '#2b7a78',
        fontSize: '32px',
        marginBottom: '10px',
    },
    image: {
        width: '150px',
        height: '150px',
        objectFit: 'contain',
        borderRadius: '10px',
        backgroundColor: '#e0e0e0',
        padding: '10px',
        marginBottom: '20px',
    },
    info: {
        color: '#555',
        fontSize: '18px',
        margin: '5px 0',
    },
    subtitle: {
        color: '#3aafa9',
        fontSize: '24px',
        marginBottom: '10px',
    },
    abilitiesList: {
        listStyle: 'none',
        padding: '0',
        color: '#333',
    },
    abilityItem: {
        backgroundColor: '#dff1f0',
        padding: '8px',
        borderRadius: '5px',
        marginBottom: '5px',
        transition: 'background-color 0.3s',
    },
    loading: {
        fontSize: '18px',
        color: '#555',
    },
    error: {
        color: 'red',
        fontSize: '18px',
    },
    noPokemon: {
        color: '#888',
        fontSize: '18px',
    },
};

export default PokemonDetail;
