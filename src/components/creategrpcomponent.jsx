import React,{ useState, useEffect, useRef } from "react";
import styles from '../components/creategrpcomponent.module.css'

function Creategrp({  addGroup,onClose }){
    const colors = ["rgba(179, 139, 250, 1)","rgba(255, 121, 242, 1)","rgba(67, 230, 252, 1)","rgba(241, 149, 118, 1)","rgba(0, 71, 255, 1)","rgba(102, 145, 255, 1)"]
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [groupName, setGroupName] = useState('');
    const popupRef = useRef(null);
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                
                onClose();
            }
        };
        
        document.addEventListener("mousedown", handleOutsideClick);
        
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    },[]);

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };
    const handleCreateGroup = () => {
        addGroup(groupName, selectedColor);
    setGroupName('');
    onClose();
    };

    return(
        <div className={styles.overlay} >
        <div ref={popupRef} className={styles.grpcomp}>
            <p className={styles.newgrp}>Create New group</p>
            <section>
            <label htmlFor='grp name' className={styles.inputgrp}>Group Name</label>
            <input id='grp name' placeholder="Enter group name" className={styles.inputfld} value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}/>
            </section>
            <section>
            
                <div className={styles.colorpicker}>
                <p className={styles.chocolor}>Choose colour</p>
                 {colors.map((color, index) => (
                        <div
                            key={index}
                            className={styles.colorOption}
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorChange(color)}
                        ></div>
                    ))}
                </div>
            </section>
           <div className={styles.btndiv}><button className={styles.btn} onClick={handleCreateGroup}>Create</button></div>
        </div>
        </div>
    );
}
export {Creategrp};