import React, { useState, useEffect } from 'react';
import api from 'api.js';

// Characters

function Characters() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch(`https://theofficeapi.dev/api/characters?limit=10&page=${page}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  }, [page]);

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

  let handlePageChange = (e) => {
    e.target.name === "Last" ? setPage(page - 1) : setPage(page + 1)
  }

  return (
    <div>
      <h2>characters:</h2>
      <div className="characters">{eCharacters}</div>
      <div >
        {!data.meta.isFirstPage &&
          <button name="Last" onClick={handlePageChange}>Last</button>
        }
        {!data.meta.isLastPage &&
          <button name="Next" onClick={handlePageChange}>Next</button>
        }
      </div>
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
