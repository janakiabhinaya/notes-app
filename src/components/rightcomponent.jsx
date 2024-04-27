import React,{useState,useEffect} from "react";
import img1 from '../images/mainimg1.jpg'
import styles from './rightcomponent.module.css'
import { IoMdLock } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
function Mainpart({ activeGroup, typedText, handleChange,setTypedText }){
  const [notes, setNotes] = useState(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || {};
    return storedNotes;
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleSend = () => {
    console.log('btn workingg...')
    console.log("Typed text:", typedText.trim());
    console.log("Active group:", activeGroup);
    if (typedText.trim() !== "" && activeGroup && activeGroup.id) {
      console.log(activeGroup)
      const newNote = {
        id: Date.now(),
        text: typedText.trim(),
        date: new Date().toLocaleString(),
        
      };
      const updatedNotes = {
        ...notes};
        updatedNotes[activeGroup.id] = [...(notes[activeGroup.id] || []), newNote];
      console.log("updatedNotes:",updatedNotes)
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      handleChange('');
      setTypedText("");
    }
  };
  

  let content = null;

  if (activeGroup && activeGroup.name && activeGroup.color) {
    const groupNotes = notes[activeGroup.id] || [];
    content = (
        <div className={styles.textareaContainer}>
          <div className={styles.groupname}>
          <div className={styles.iconCircle} style={{ backgroundColor: activeGroup.color }}>
            {getRandomLetters(activeGroup.name)}
          </div>
          <div className={styles.groupName}>{activeGroup.name}</div>
          </div>
          <div className={styles.notesContainer}>
          {groupNotes.map(note => (
            <div key={note.id} className={styles.note}>
              {note.text}
              <div className={styles.date}>{note.date}</div>
            </div>
           ))} 
        </div>
        <div className={styles.sendingtext}>
          <textarea
            className={styles.textarea}
            value={typedText}
            onChange={(e) => handleChange(e)}
            placeholder={'Here’s the sample text for sample work'}
            />
      <button className={styles.sendButton}
      onClick={handleSend}
      disabled={!typedText.trim()}
     >
      <IoMdSend />
      </button>
        </div>
        </div>
      );
    }
      else {
        content = (
      <div className={styles.mainclass}>
      <div className={styles.mainpart}><img src={img1} alt="logo" className={styles.imgstyle}/>
      <p className={styles.pocket}>Pocket Notes</p>
        <p className={styles.pockettext}>Send and receive messages without keeping your phone online.<br/>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p></div>
        <div className={styles.encrypt}> <IoMdLock  className={styles.logopart}/>end-to-end encrypted</div>
    </div>
    );
  }
  
  return (
    <div className={styles.textbody}>
      {content}
    </div>
  );
}
function getRandomLetters(str) {
  const words = str.split(" ");
  let firstLetter = "";
  let secondLetter = "";

  if (words.length >= 2) {
    firstLetter = words[0][0].toUpperCase();
    secondLetter = words[1][0].toUpperCase();
  } else if (words.length === 1) {
    firstLetter = words[0][0].toUpperCase();
  }

  return `${firstLetter}${secondLetter}`;
}

export {Mainpart};