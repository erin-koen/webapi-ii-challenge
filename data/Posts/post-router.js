const express = require("express");

//is capitalized here SOP?
const Posts = require("./db");
// bring in the router
const router = express.Router();

//handle requests below

//create a post using the information sent inside request body

router.post("/", (req, res) => {
  const { title, contents } = req.body;
  !title || !contents
    ? res.status(400).json({
        errorMessage: "Please provide title and contents for the post"
      })
    : Posts.insert({ title, contents })
        .then(post => {
          res.status(201).json({ post });
        })
        .catch(err => {
          res.status(500).json({
            error: "There was an error while saving the post to the database."
          });
        });
});

//Return an array of all the post objects contained in the database

router.get("/", (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts' information could not be retrieved." });
    });
});

//Returns the post object with the specified ID

router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log("This is the id:", id);
  Posts.findById(id)
    .then(post => {
      post.length > 0
        ? res.status(200).json(post)
        : res
            .status(404)
            .json({ message: "the post with the specified id does not exist" });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved" });
    });
});

//Removes the post with the specified ID and returns the deleted post object. Might need add'l calls to satisfy that requirement

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Posts.findById(id).then(post =>
    post.length < 1
      ? res.status(404).json({
          message: "The post with the specified ID does not exist."
        })
      : Posts.remove(post.id)
          .then(post => {
            res.status(200).json({ post: "deleted" });
          })
          .catch(err => {
            res.status(500).json({ error: "The post could not be removed" });
          })
  );
});

//Updates the post with the specified ID using data from request body. Returns the modified document, not the original

router.put("/:id", (req, res) => {
  const { id } = req.params;
  console.log("this is the id:", id);
  const { title, contents } = req.body;
  return (!title || !contents)
    ? res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      })
    : Posts.update(id, { title, contents })
        .then(post => 
            post.length >1 ?
            res.status(200).json( post ) : res.status(404).json({error: "A post with that ID does not exist"})
        .catch(err =>
          res
            .status(500)
            .json({ error: "The post information could not be modified." })
        ))});

module.exports = router;
