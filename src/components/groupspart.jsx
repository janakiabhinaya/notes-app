import React,{ useState, useRef, useEffect } from "react";
import styles from './groupspart.module.css';
import { Creategrp } from "./creategrpcomponent";
import { Textpart } from "./textpart";
function Grouppart(){
  
    const [groups, setGroups] = useState(() => {
        const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
        return storedGroups;
    });
    useEffect(() => {
        localStorage.setItem('groups', JSON.stringify(groups));
    }, [groups]);

  const [showCreategrp, setShowCreategrp] = useState(false);
  const popupRef = useRef(null);

  const [activeGroup, setActiveGroup] = useState(null);
 
  const handleBackButtonClick = () => {
    setActiveGroup(null);
  };

    const toggleCreategrp = () => {
        setShowCreategrp(!showCreategrp);
    };
    const handleCloseCreategrp = () => {
      setShowCreategrp(false);
  };
 
  const addGroup = (groupName, groupColor) => {
    const newGroup = {
      id: `dummy-id-${groupName.toLowerCase().replace(/\s+/g, '-')}`, // Generate a unique ID based on the current timestamp
      name: groupName,
      color: groupColor,
      notes: [] 
    };
    setGroups([...groups, newGroup]);
    handleCloseCreategrp();
};
useEffect(() => {
    const handleOutsideClick = (e) => {
        
        if (popupRef.current && !popupRef.current.contains(e.target)) {
            setShowCreategrp(false);
            
        }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
    };
}, []);

const getRandomLetters = (str) => {
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
};
const [typedText, setTypedText] = useState("");
const saveTextInGroup = (groupId, text) => {
    const updatedGroups = groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          notes: [...group.notes, { id: Date.now(), text }]
        };
      }
      return group;
    });
    setGroups(updatedGroups);
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
  };
   
const handleGroupClick = (group) => {
    setActiveGroup(group);
  };

  const handleChange = (e) => {
    console.log("handleChange called");
    if (e && e.target && e.target.value) {
        console.log("Typed text:", e.target.value);
        setTypedText(e.target.value);
    }
  };
    return(
        <div className={styles.leftcomp}>
          {activeGroup ? (<div className={styles.textblock}>
          <Textpart
            activeGroup={activeGroup}
            typedText={typedText}
            setTypedText={setTypedText}
            handleChange={handleChange}
            handleBackButtonClick={handleBackButtonClick}
          />
        </div>
          ):(
        <div className={styles.groupsbody}>
      <div className={styles.noteshead}>Pocket Notes</div>
      <div className={styles.groups}>
      <button className={styles.plusbtn} onClick={toggleCreategrp}>+</button>
      {groups.map((group, index) => (
  
                    <div
                        key={index}
                        className={styles.group}
                        onClick={() => handleGroupClick(group)}
                    >
                         <div className={styles.groupIcon}>
                            <div className={styles.iconCircle} style={{ backgroundColor: group.color }}>
                            {getRandomLetters(group.name)}
                            </div>
                        <div className={styles.groupName}>{group.name}</div>
                    </div>
                    </div>
                  
                ))}
                {showCreategrp && (<Creategrp addGroup={addGroup} onClose={handleCloseCreategrp} ref={popupRef}/>)}
                </div></div>
                
              )}
              </div>
          
    );
}
export {Grouppart};