import React, { useState, useEffect } from 'react';
import api from 'api.js';

// Characters

function Characters() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(2)

  useEffect(() => {
    fetch(`https://theofficeapi.dev/api/characters?limit=50&page=${page}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!data) return '...';

  let eCharacters = data.results.map((result) => {
    return (
      <Character
        key={result.id}
        {...{
          character: result,
        }}
      />
    );
  });

  return (
    <div>
      <h2>characters:</h2>
      <div className="characters">{eCharacters}</div>
    </div>
  );
}

function Character({ character }) {
  return (
    <a onClick={(e) => api.router.click(e, { tab: 'character', character: character.id })} href={`/${character.id}`}>
      {character.name}
    </a>

  );
}

export default Characters;
