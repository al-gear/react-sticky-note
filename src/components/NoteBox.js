import React, { useContext, useState } from 'react'
import MainContext from '../MainContext'

const NoteBox = () => {
    const { notePosition, setMode, notes, setNotes, setBoxVisible } = useContext(MainContext)

    const types = [
        {
            name: "comment",
            color: "red",
            text: "Yorum"
        },
        {
            name: "private-comment",
            color: "#999",
            text: "Gizli Yorum"
        },
        {
            name: "note",
            color: "orange",
            text: "not"

        }
    ]
    const [color, setColor] = useState(types[0].color)
    const [note, setNote] = useState("")
    const changeColor = (e) => {
        setColor(e.target.value)
    }

    const addNote = () => {
        const currentNote = {
            id: String(notes.length + 1),
            note: note,
            number: notes.length + 1,
            color: color,
            position: {
                x: notePosition.x,
                y: notePosition.y
            }
        }

        setNotes([...notes, currentNote]);
        setBoxVisible(false);
        setMode(true);
    }

    return (
        <div onMouseEnter={() => setMode(false)} onMouseLeave={() => setMode(true)} className="notebox"
            style={{ "--color": color, position: "absolute", top: notePosition.y, left: notePosition.x }}>
            <span className="notebox-number" >{notes.length + 1}</span>
            <select onChange={changeColor} >
                {types.map(type => (
                    <option value={type.color}>{type.text}</option>
                ))}
            </select>
            <textarea onChange={(e) => setNote(e.target.value)} cols="30" rows="5" />
            <button onClick={addNote} disabled={!note}>Ekle</button>
        </div>
    )
}

export default NoteBox
