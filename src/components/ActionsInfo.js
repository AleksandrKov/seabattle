// import React from "react";

// const ActionsInfo = ({ shipsReady = false, canShoot = false, ready }) => {
//   if (!shipsReady) {
//     return (
//       <button className="btn-ready" onClick={ready}>
//         Корабли готовы
//       </button>
//     );
//   }
//   return <div>{canShoot ? <p>Стреляй</p> : <p>Выстрел соперника</p>}</div>;
// };

// export default ActionsInfo;

import React from "react";

const ActionsInfo = ({ shipsReady = false, canShoot = false, ready }) => {
  if (!shipsReady) {
    return (
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          onClick={ready}
        >
          Корабли готовы
        </button>
      </div>
    );
  }
  return <div>{canShoot ? <p className="text-center">Стреляй</p> : <p className="text-center">Выстрел соперника</p>}</div>;
};

export default ActionsInfo;

