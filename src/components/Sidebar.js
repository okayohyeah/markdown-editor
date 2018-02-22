import React, { Component } from "react";

class Sidebar extends Component {
  renderList() {
    // create list array
    let list = [];
    // for each note from this.props.note that we have taken in
    this.props.notes.forEach((note) => {
      // add to list array
      list.push(
        <li key={note.id} onClick={() => this.props.select(note)} className={note.id === this.props.selected.id ? "selected" : ""}>
          { note.body }
        </li>
      );
    });
    return list;
  }

  render() {
    return (
      <div className="sidebar column column-40">
        <button className="button-pink" onClick={this.props.add}>+ add new note</button>
        <dl className="notes">
          { this.renderList() }
        </dl>
      </div>
    );
  }
}

export default Sidebar;