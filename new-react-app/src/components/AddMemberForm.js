import React, { useEffect, useState } from "react";
import "./AddMemberForm.css";

const emptyForm = {
  name: "",
  email: "",
  role: "",
};

function AddMemberForm(props) {
  const [formData, setFormData] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (props.editMode) {
      setFormData(props.editMode);
      setIsEditing(true);
    } else {
      setFormData(emptyForm);
      setIsEditing(false);
    }
  }, [props.editMode]);

  function submitHandler(e) {
    e.preventDefault();
    if (isEditing) {
      props.editMember(formData);
      setIsEditing(false);
    } else {
      props.addMember(formData);
      setFormData(emptyForm);
    }
  }

  function changeHandler(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <div className="member-form">
      {isEditing ? <h2>Üye Düzenle</h2> : <h2>Yeni Üye Ekle</h2>}
      <form onSubmit={submitHandler}>
        <div className="input-container">
          <label htmlFor="name">İsim</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={changeHandler}
          />
        </div>

        <div className="input-container">
          <label htmlFor="email">Eposta</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />
        </div>

        <div className="input-container">
          <label htmlFor="role">Rol</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={changeHandler}
          />
        </div>

        <div className="form-buttons">
          <button type="submit">
            {isEditing ? "Üye Düzenle" : "Yeni Üye Ekle"}
          </button>
          {isEditing && (
            <button type="button" onClick={() => setIsEditing(false)}>
              İptal
            </button>
          )}
          {!isEditing && (
            <button type="button" onClick={() => setFormData(emptyForm)}>
              Sıfırla
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddMemberForm;
