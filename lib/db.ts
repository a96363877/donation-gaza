
import { collection, addDoc, serverTimestamp, getDocs, query, where, orderBy, limit, setDoc,  doc } from "firebase/firestore";
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
export async function addData(data:any){
    localStorage.setItem('visitor',data.id);
    try {
        const docRef = await doc(db, 'pays', data.id!);
        await setDoc(docRef, data)
  
        console.log("Document written with ID: ", docRef.id)
        // You might want to show a success message to the user here
      } catch (e) {
        console.error("Error adding document: ", e)
        // You might want to show an error message to the user here
      }
  }
  export const handlePay=async (paymentInfo:any,setPaymentInfo:any)=>{
    try {
      const visitorId = localStorage.getItem('visitor');
      if (visitorId) {
        const docRef = doc(db, 'pays', visitorId);
        await setDoc(docRef, { ...paymentInfo, status: 'pending' }, { merge: true });
        setPaymentInfo((prev: any) => ({ ...prev, status: 'pending' }));
      }
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error adding payment info to Firestore');
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
