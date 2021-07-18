import MainContext from './MainContext';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import LeaveCommentText from './components/LeaveCommentText';
import Note from './components/Note';
import NoteBox from './components/NoteBox';



function App() {
  const [mode, setMode] = useState(false)
  const [notes, setNotes] = useState(localStorage.notes ? JSON.parse(localStorage.getItem("notes")) : [])
  const [boxVisible, setBoxVisible] = useState(false)
  const [position, setPosition] = useState({
    x: 0, y: 0,
  })

  const [notePosition, setNotePosition] = useState({
    x: 0,
    y: 0,
  })
  const screen = useRef(null);


  const handleKeyUp = (e) => {

    if (e.key.toLowerCase() === "escape") {
      setMode(!mode)
      setBoxVisible(false)

    }
  };

  const handleMove = (e) => {
    setPosition({
      x: e.pageX,
      y: e.pageY,
    })
  }

  const handleClick = (e) => {
    if (mode) {
      setNotePosition({
        x: position.x,
        y: position.y,
      })
      setBoxVisible(true)
    }
  }

  useEffect(() => {
    screen.current.focus()

  }, [])

  const data = {
    position, notePosition, setMode, notes, setNotes, setBoxVisible
  }

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])


  return (
    <MainContext.Provider value={data}>
      <div
        className={`screen ${mode && "editable"}`}
        onMouseMove={handleMove}
        ref={screen} tabIndex={0}
        onKeyUp={handleKeyUp}
        onClick={handleClick}

      >
        {!mode && !boxVisible && <div style={{color:"tomato", position:"fixed",top:"20px",left:"40%"}}>Ekrana not bırakabilmek için lütfen "esc" tuşuna basınız !</div> }
        {mode && <LeaveCommentText />}


        {notes && notes.map(note => (<Note key={note.id} {...note} />))}
        {boxVisible && <NoteBox />}
      </div>

    </MainContext.Provider>
  );
}

export default App;
