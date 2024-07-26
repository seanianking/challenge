import React, { useState, useEffect } from 'react';

function Character({ character }) {

  const [data, setData] = useState(null);
  useEffect(() => {

    fetch(`https://theofficeapi.dev/api/character/${character}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {

        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!data) return '...';

  return (
    <div style={{ display: "flex", justifyContent: 'center' }}>

      <table>
        <tbody>


          <tr>
            <th>Name:{data.name}</th>
          </tr>
          <tr>
            <td>
              Job: {data.job}
            </td>
          </tr>
          <tr>
            <td>

              First Workplace: {data.workplace[0]}
            </td>
          </tr>
          <tr>
            <td>

              First Appearance: {data.firstAppearance}
            </td>
          </tr>
          <tr>
            <td>

              Last Appearance: {data.lastAppearance}
            </td>
          </tr>
          <tr>
            <td>

              Actor: {data.actor}
            </td>
          </tr>
        </tbody>
      </table>
    </div >
  );
}

export default Character;
