const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const userData = require('../../utilityUsers');
const path = require("path")
let users;


async function init() {
  users = await userData.getUsers();
  //Get All Users
  router.get('/', (req, res) => {
    res.json(users)
  });

  // Get Single User By ID
  router.get('/:id', (req, res) => {
    const found = users.some(user => user.id == req.params.id);

    if (found) {
      res.json(users.filter(user => user.id == req.params.id)[0]);
    } else {
      res.status(400).json({
        msg: "There is no user with the id of ${req.params.id}"
      });
    }
  });


  //send login informations
  router.post('/login', (req, res) => {
    const newUser = {
      email: req.body.email,
      password: req.body.password
    }

    if (!newUser.password || !newUser.email) {
      res.status(400).json({
        msg: "Please include all informations"
      })
    } else {
      const found = users.some(user => user.password == req.body.password && user.email == req.body.email);

      if (found) {
        res.json(users.filter(user => user.password == req.body.password && user.email == req.body.email)[0]);
      } else {
        res.status(400).json({
          msg: "Incorrect informations"
        });
      }
    }

  });



  //Create New User
  router.post("/", async (req, res) => {
    //Create member
    const newUser = {
      id: uuid.v4(),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      photos: []
    }

    if (!newUser.password || !newUser.email || !newUser.name) {
      res.status(400).json({
        msg: "Please include all informations"
      })
    } else {
      if (req.body.password === req.body.rpassword) {
        //Add to list
        users.push(newUser);
        res.json(users);
        await userData.setUsers(users);
      } else {
        res.status(400).json({
          msg: "Passwords dont match"
        })
      }
    }
  });

  //Update user List of Links

  //delete pic
  router.patch('/delete_pic/:id', async (req, res) => {
    const found = users.some(user => user.id === req.params.id);

    if (found) {
      const pic = {
        "link_ph": req.body.link_ph,
        "desc": req.body.desc
      };

      users.forEach(async (user) => {
        if (user.id === req.params.id) {
            user.photos = user.photos.filter(photo => pic.link_ph != photo.link_ph || pic.desc != photo.desc )
            await userData.setUsers(users);
            res.json(user.photos);
        }
      });
    } else {
      res.status(400).json({
        msg: `There is no user with the id of ${req.params.id}`
      });
    }
  });


  //add pic
  router.patch('/add_pic/:id', async (req, res) => {
    const found = users.some(user => user.id === req.params.id);

    if (found) {
      const updUser = req.body;
      const pic = {
        "link_ph": updUser.link_ph,
        "desc": updUser.desc
      };

      users.forEach(async (user) => {
        if (user.id === req.params.id) {
          if (updUser.link_ph && updUser.desc) {
            user.photos.push(pic);
            await userData.setUsers(users);
            res.json(user.photos);
          } else {
            res.status(400).json({
              msg: `Please insert all informations needed`
            });
          }
        }
      });
    } else {
      res.status(400).json({
        msg: `There is no user with the id of ${req.params.id}`
      });
    }
  });

  //edit description
  router.patch('/edit_pic/:id', async (req, res) => {
    const found = users.some(user => user.id === req.params.id);

    if (found) {
      const pic = {
        "link_ph": req.body.link_ph,
        "desc": req.body.desc,
        "desc_nou": req.body.desc_nou
      };

      users.forEach(async (user) => {
        if (user.id === req.params.id) {
          ((user.photos.filter(photo => pic.link_ph == photo.link_ph && pic.desc == photo.desc)[0]).desc)= pic.desc_nou;
          await userData.setUsers(users);
          res.json(user.photos);
        }
      });
    } else {
      res.status(400).json({
        msg: `There is no user with the id of ${req.params.id}`
      });
    }
  });





  //Delete User
  router.delete('/:id', async (req, res) => {
    const found = users.some(user => user.id == req.params.id);

    if (found) {
      users = users.filter(user => user.id !== req.params.id);
      await userData.setUsers(users);
      res.json({
        msg: "User Deleted",
        users: users
      });
      
    } else {
      res.status(400).json({
        msg: `There is no user with the id of ${req.params.id}`
      });
    }
  });

}
init();


module.exports = router;