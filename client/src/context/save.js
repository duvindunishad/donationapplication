import { useState, useContext, createContext, useEffect } from "react";

const SaveContext = createContext();
const SaveProvider = ({ children }) => {
  const [Save, setSave] = useState([]);

  useEffect(() => {
    let existingSaveItem = localStorage.getItem("save");
    if (existingSaveItem) setSave(JSON.parse(existingSaveItem));
  }, []);

  return (
    <SaveContext.Provider value={[Save, setSave]}>
      {children}
    </SaveContext.Provider>
  );
};

//custom hook
const useSave = () => useContext(SaveContext);

export { useSave, SaveProvider };
