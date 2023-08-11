import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 0 auto;
  max-width: 800px;
`;

const Section = styled.div`
  margin: 20px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  width: 100%;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
`;

function App() {
  const [file, setFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:8290/api/files", formData);
      alert("File uploaded successfully!");
    } catch (error) {
      alert("An error occurred while uploading the file");
    }
  };

  const searchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8290/api/users", {
        params: { q: searchQuery },
      });
      setUsers(response.data);
      setSearchQuery("");
      if (response.data.length === 0) {
        alert("No users found.");
      }
    } catch (error) {
      throw new Error("Error");
    }
  };

  return (
    <AppContainer>
      <h1>SP</h1>
      <Section>
        <h2>Upload CSV File</h2>
        <input type="file" onChange={handleFileChange} />
        <Button onClick={uploadFile}>Upload</Button>
      </Section>
      <Section>
        <h2>Search Users</h2>
        <Input
          type="text"
          placeholder="Search by name, city, country, or favorite sport"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={searchUsers}>Search</Button>
        <List>
          {users.map((user: any, index) => (
            <ListItem key={index}>
              <strong>Name:</strong> {user.name}
              <br />
              <strong>City:</strong> {user.city}
              <br />
              <strong>Country:</strong> {user.country}
              <br />
              <strong>Favorite Sport:</strong> {user.favorite_sport}
            </ListItem>
          ))}
        </List>
      </Section>
    </AppContainer>
  );
}

export default App;
