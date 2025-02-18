import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PokemonsList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0); // Track current pagination offset
    const limit = 20; // Limit per page
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPokemons = async () => {
            setLoading(true); // Ensure loading state is set before fetching
            try {
                const response = await axios.get(`http://localhost:8080/pokemons?limit=${limit}&offset=${offset}`);
                if (response && response.data && response.data.results && Array.isArray(response.data.results)) {
                    setPokemons(response.data.results);
                } else {
                    throw new Error("Unexpected response structure. Check API response format.");
                }
            } catch (error) {
                console.error("Error fetching the Pokémon list:", error);
                setError("Failed to load Pokémon list.");
            } finally {
                setLoading(false);
            }
        };

        fetchPokemons();
    }, [offset]);

    const handlePokemonClick = (name) => {
        navigate(`/pokemon/${name}`);
    };

    const handleNextPage = () => {
        setOffset((prevOffset) => prevOffset + limit);
    };

    const handlePreviousPage = () => {
        if (offset > 0) {
            setOffset((prevOffset) => prevOffset - limit);
        }
    };

    if (loading) return <div style={styles.loading}>Loading...</div>;

    if (error) return <div style={styles.error}>{error}</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Pokémon List</h1>
            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.tableHeader}>Name</th>
                    <th style={styles.tableHeader}>Details</th>
                </tr>
                </thead>
                <tbody>
                {pokemons.map((pokemon) => (
                    <tr key={pokemon.name} style={styles.tableRow}>
                        <td style={styles.tableCell}>{pokemon.name}</td>
                        <td style={styles.tableCell}>
                            <button style={styles.detailsButton} onClick={() => handlePokemonClick(pokemon.name)}>
                                View Details
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div style={styles.pagination}>
                <button style={styles.paginationButton} onClick={handlePreviousPage} disabled={offset === 0}>
                    Previous
                </button>
                <button style={styles.paginationButton} onClick={handleNextPage}>
                    Next
                </button>
            </div>
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
        maxWidth: '600px',
        margin: '20px auto',
        textAlign: 'center',
    },
    title: {
        color: '#2b7a78',
        fontSize: '28px',
        marginBottom: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
    },
    tableHeader: {
        backgroundColor: '#2b7a78',
        color: 'white',
        padding: '10px',
        fontWeight: 'bold',
    },
    tableRow: {
        transition: 'background-color 0.3s',
        cursor: 'pointer',
    },
    tableRowHover: {
        backgroundColor: '#dff1f0',
    },
    tableCell: {
        padding: '10px',
        borderBottom: '1px solid #ccc',
    },
    detailsButton: {
        backgroundColor: '#3aafa9',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    detailsButtonHover: {
        backgroundColor: '#2b7a78',
    },
    pagination: {
        marginTop: '20px',
    },
    paginationButton: {
        backgroundColor: '#3aafa9',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        marginRight: '10px',
    },
    loading: {
        fontSize: '18px',
        color: '#555',
    },
    error: {
        color: 'red',
        fontSize: '18px',
    },
};

export default PokemonsList;
