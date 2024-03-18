import { db } from "../authentication/firebase";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const rideCollectionRef = collection(db, "rides");
class RideDataService {
  updateRide = (id, updatedRide) => {
    const rideDoc = doc(db, "rides", id);
    return updateDoc(rideDoc, updatedRide);
  };
  deleteRide = (id) => {
    const rideDoc = doc(db, "rides", id);
    return deleteDoc(rideDoc);
  };
  getAllRides = () => {
    return getDocs(rideCollectionRef);
  };
  getRide = (id) => {
    const rideDoc = doc(db, "rides", id);
    return getDoc(rideDoc);
  };
}

export default new RideDataService();
