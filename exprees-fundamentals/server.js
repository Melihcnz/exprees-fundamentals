const express = require("express");
const {accessControl,defaultMiddleware} = require("./middleware");

const users = [ 
    {id: 1, name: "Mustafa Murat Coşkun",place: "Ankara"}, 
    {id: 2, name: "Serhat Say", place: "İstanbul"}
];


const app = express();
const PORT = 5000;

app.use(express.json());
//Get Request
// localhost:5000/users

app.get("/users/",(req,res,next) => {
    res.json({
        success : true,
        data: users
    });
});
app.post("/users/",(req,res,next) => {
    const user = req.body;
    users.push(user);
    res.json({
        success: true,
        data : users
    });
});
app.put("/users/:id",(req,res,next) => {
    const id = parseInt(req.params.id);//! 1. Adım: İstekten 'id' parametresini al ve tamsayıya çevir.

    for (let i = 0; i < users.length; i++) { //! 2. Adım: users dizisi içindeki tüm kullanıcılar üzerinde döngü.
        if (users[i].id === id) { //! 3. Adım: Eğer kullanıcının id'si ile parametre olarak gelen id eşleşirse,
            users[i] = {           //! 4. Adım: O kullanıcının verilerini güncelle.
                ...users[i],        //! 5. Adım: Var olan kullanıcının tüm mevcut verilerini koru.
                ...req.body         //! 6. Adım: İsteğin gövdesinden gelen yeni verilerle güncelle.
            };
        }
    }
    res.json({
        success: true,
        data : users
    });
});
app.delete("/users/:id",(req,res,next) => {
    const id = parseInt(req.params.id);

    for (let i = 0; i < users.length; i++) { //! 2. Adım: users dizisi içindeki tüm kullanıcılar üzerinde döngü.
        if (users[i].id === id) { //! 3. Adım: Eğer kullanıcının id'si ile parametre olarak gelen id eşleşirse,
            users.splice(i,1);
        }
    }

    res.json({
        success: true,
        data : users
    });
});
app.listen(PORT,() => {
    console.log("Server Started PORT:" + PORT);
});