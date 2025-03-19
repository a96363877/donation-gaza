
import { collection, addDoc, serverTimestamp, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "./firebase";

export type Donation = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  amount: number;
  projectName: string;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt?: any;
}

export async function addDonation(donation: Donation) {
  try {
    const docRef = await addDoc(collection(db, "donations"), {
      ...donation,
      createdAt: serverTimestamp()
    });
    return { id: docRef.id, success: true };
  } catch (error) {
    console.error("Error adding donation: ", error);
    return { success: false, error };
  }
}

export async function getProjectDonations(projectName: string, limit = 10) {
  try {
    const q = query(
      collection(db, "donations"),
      where("projectName", "==", projectName),
      where("status", "==", "completed"),
      orderBy("createdAt", "desc"),
    );
    
    const querySnapshot = await getDocs(q);
    const donations: any[] = [];
    
    querySnapshot.forEach((doc) => {
      donations.push({ id: doc.id, ...doc.data() });
    });
    
    return donations;
  } catch (error) {
    console.error("Error getting donations: ", error);
    return [];
  }
}

export async function getProjectStats(projectName: string) {
  try {
    const q = query(
      collection(db, "donations"),
      where("projectName", "==", projectName),
      where("status", "==", "completed")
    );
    
    const querySnapshot = await getDocs(q);
    let totalAmount = 0;
    let donorCount = 0;
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      totalAmount += data.amount || 0;
      donorCount++;
    });
    
    return { totalAmount, donorCount };
  } catch (error) {
    console.error("Error getting project stats: ", error);
    return { totalAmount: 0, donorCount: 0 };
  }
}
