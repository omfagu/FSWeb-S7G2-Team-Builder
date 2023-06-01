import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import AddMemberForm from "./components/AddMemberForm";

function App() {
  const [editingMember, setEditingMember] = useState(null);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios
      .get("https://reqres.in/api/workintech")
      .then((response) => {
        setMembers(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function addMember(newMember) {
    axios
      .post("https://reqres.in/api/workintech", newMember)
      .then((response) => {
        const updatedMembers = [...members, response.data];
        setMembers(updatedMembers);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function editMember(editedMember) {
    axios
      .put(`https://reqres.in/api/workintech/${editingMember.id}`, editedMember)
      .then((response) => {
        const updatedMembers = members.map((member) => {
          if (member.id === response.data.id) {
            return response.data;
          }
          return member;
        });
        setMembers(updatedMembers);
        setEditingMember(null);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteMember(memberId) {
    axios
      .delete(`https://reqres.in/api/workintech/${memberId}`)
      .then(() => {
        const updatedMembers = members.filter(
          (member) => member.id !== memberId
        );
        setMembers(updatedMembers);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function editHelper(member) {
    setEditingMember(member);
  }

  return (
    <div className="App">
      <h2>Üye Listesi</h2>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            <div className="member-info">
              <span>
                <strong>İsim:</strong> {member.name}
              </span>
              <span className="email">
                {" "}
                - <strong>E-posta:</strong> {member.email}
              </span>
              <span className="role">
                {" "}
                - <strong>Rol:</strong> {member.role}
              </span>
            </div>
            <div className="member-actions">
              <button
                className="edit-button"
                onClick={() => editHelper(member)}
              >
                Düzenle
              </button>
              <button
                className="delete-button"
                onClick={() => deleteMember(member.id)}
              >
                Sil
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="add-member-form">
        <AddMemberForm
          addMember={addMember}
          editMember={editMember}
          editMode={editingMember}
        />
      </div>
    </div>
  );
}

export default App;
