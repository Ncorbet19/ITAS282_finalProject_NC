import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

function ClubInfo({ clubId }) {
  const [clubName, setClubName] = useState("");

  useEffect(() => {
    const getClubName = async () => {
      try {
        const clubRef = doc(db, "clubs", clubId);
        const clubDoc = await getDoc(clubRef);
        const clubData = clubDoc.data();
        setClubName(clubData.name);
      } catch (error) {
        console.error(error);
      }
    };
    getClubName();
  }, [clubId]);

  // return <h2>{clubName}</h2>;
}

export default ClubInfo;

// import { useEffect, useState } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebase";

// function ClubInfo({ clubId }) {
//   const [clubName, setClubName] = useState("");

//   useEffect(() => {
//     const getClubName = async () => {
//       try {
//         const clubRef = doc(db, "clubs", clubId);
//         const clubDoc = await getDoc(clubRef);
//         const clubData = clubDoc.data();
//         setClubName(clubData.name);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     getClubName();
//   }, [clubId]);

//   return <h2>Club Name: {clubName}</h2>;
// }

// export default ClubInfo;

