import React, { Component } from "react";
import "milligram";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";

class App extends Component {
  constructor() {
    super();
    const noteKey = "md_notes";
    const storedNotes = JSON.parse(localStorage.getItem(noteKey));
    this.state = {
      notes: storedNotes ? storedNotes : [],
      selectedNote: ""
    };
    this.generatedId = this.generatedId.bind(this);
    this.addNote = this.addNote.bind(this);
    this.selectNote = this.selectNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }

  generatedId() {
    return this.gen4() + this.gen4() + "-" + this.gen4() + "-" + this.gen4() + "-" + this.gen4() + this.gen4() + this.gen4();
  }

  gen4() {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  }

  addNote() {
    const uid = this.generatedId();
    const note = { id: uid, body: "Create note..." };

    console.log(note);
    // add notes state into a newNotes array
    const newNotes = this.state.notes;
    newNotes.push(note);
    // reset notes state to array
    this.setState({ notes: newNotes });

    // also select note
    this.selectNote(note);
    // and save to localStorage
    this.save(this.state.notes);
  }

  selectNote(note) {
    if (note === this.state.selectedNote) {
      return;
    };
    // sets state of selected note to selected note 
    this.setState({ selectedNote: note });
  }

  save(notes) {
    if (!notes) {
      return;
    } else {
      const noteKey = "md_notes";
      localStorage.setItem(noteKey, JSON.stringify(notes));
    };
  }

  updateNote(body) {
    // get state of notes
    let notes = this.state.notes;
    // get current note from selected note
    let currentNote = this.state.selectedNote;
    // pass in body of note in Editor into body of current note
    currentNote.body = body;
    // set state of selected note to current note with body passed in from Editor
    this.setState({ selectedNote: currentNote });

    // filter through notes array to find correct note that is current note
    let noteIndex = notes.findIndex((n) => {
      return n.id === currentNote.id;
    });

    // update body with current note body
    notes[noteIndex].body = currentNote.body;

    //set notes to notes state
    // this.statenotes: notes
    this.setState({ notes: notes });

    // save to local storage
    this.save(this.state.notes);
  }

  render() {
    return (
      <div className="App container">
        <h1 className="md_h1">Mark It Down</h1>
        <h3 className="md_h3">Your Friendly Markdown Editor</h3>
        <div className="row">  
          <Sidebar add={this.addNote} select={this.selectNote} selected={this.state.selectedNote} notes={this.state.notes}/>
          <Editor change={this.updateNote} currentNote={this.state.selectedNote} />
        </div>
      </div>
    );
  }
}

export default App;
