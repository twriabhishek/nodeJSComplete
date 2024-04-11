const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const port = 8023;

app.use(express.json());

//In this we do ssr[server side rendering]
app.get("/user", (req, res) => {
  const html = `
  \n<ul>
      ${users
        .map(
          (user) => `
          <li>ID: ${user.id}</li>
          <li>First Name: ${user.first_name}</li>
          <li>Last Name: ${user.last_name}</li>
          <li>Email: ${user.email}</li>
          <li>Gender: ${user.gender}</li>
          <li>Job Title: ${user.job_title}</li>
      `
        )
        .join(" ")}
  </ul>
`;
  res.send(html);
});



app.get("/api/user", (req, res) => {
  res.send(users);
});



app.get("/api/user/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  res.send(user);
});



app.post("/api/user", (req, res) => {
  const newUser = req.body;
  const genratedID = users.length + 1;
  users.push({ genratedID, ...newUser });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    res.send("Succesfully created");
  });
});



app.put("/api/user/:id", (req, res) => {
  const { first_name, last_name, email, gender, job_title } = req.body;
  const id = Number(req.params.id);
  const ExistingUser = users.find((user) => user.id === id);

  ExistingUser.first_name = first_name;
  ExistingUser.last_name = last_name;
  ExistingUser.email = email;
  ExistingUser.gender = gender;
  ExistingUser.job_title = job_title;

  const indexToReplace = users.findIndex((user) => user.id === id);
  // If the indexToReplace is found, replace the object with the replacementObject
  if (indexToReplace !== -1) {
    users[indexToReplace] = ExistingUser;
  }

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    res.send("Update Successfully");
  });

});



app.delete("/api/user/:id", (req, res) => {
    const id = Number(req.params.id);
    const updatedUsers = users.filter(user => user.id !== id);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(updatedUsers), (err, data) => {
        res.send("Deleted Successfully");
    });
});



app.listen(port, () => {
  console.log(`Server is listening on Port: ${port}`);
});
