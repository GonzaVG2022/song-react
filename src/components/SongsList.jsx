import axios from 'axios';
import React from 'react';
import { Badge, Button, ListGroup, Table } from 'react-bootstrap';

const SongsList = ({ songs, getSongs, showSuccessNotf, showFailNotf, setIsLoading, selectSong }) => {

    const deleteSong = id => {
        setIsLoading(true);
        // endpoint DELETE -> /songs/:id
        axios.delete(`http://localhost:8080/api/v1/songs/${id}`)
            .then(() => {
                getSongs();
                showSuccessNotf("Song removed successfully");
            })
            .catch(() => showFailNotf())
            .finally(() => setIsLoading(false))
    }

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Artist</th>
                        <th>Genre</th>
                        <th>Release date</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>   
                {
                    songs.map(song => {
                        const releaseDate = new Date(song.releaseDate)
                            .toLocaleDateString('en-us', {day: 'numeric', month: 'long', year: 'numeric'})

                        return (
                            <tr key={song.id}>
                                <td>{song.name}</td>
                                <td>{song.artist}</td>
                                <td>{song.genre}</td>
                                <td>{releaseDate}</td>
                                <td>
                                    <Button 
                                        variant='danger'
                                        size='sm'
                                        className="me-1"
                                        onClick={() => deleteSong(song.id)}
                                    >
                                        Delete
                                    </Button>
                                    <Button 
                                        variant='warning'
                                        size='sm'
                                        onClick={() => selectSong(song)}
                                    >
                                        Update
                                    </Button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        </div>
    );
};

export default SongsList;