import { createContext, useContext } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const sendMessage = async (data) => {
    await addDoc(collection(db, "contacts"), {
      ...data,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <ContactContext.Provider value={{ sendMessage }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => useContext(ContactContext);
