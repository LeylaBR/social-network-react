import { profileReducer } from "./profileReducer";
import { addPost, deletePost } from "./profileReducer";

const state = {
  postData: [
    { id: 1, message: "Hi, how are you?", likesCount: 10 },
    { id: 2, message: "It's my first post", likesCount: 5 },
    { id: 3, message: "I'm at an exhibition in Italy", likesCount: 50 },
  ],
};

test("adding a new post", () => {
  const action = addPost("I am happy:)");
  let newState = profileReducer(state, action);
  expect(newState.postData.length).toBe(4);
});

test("message of new post", () => {
  const action = addPost("I am happy:)");
  let newState = profileReducer(state, action);
  expect(newState.postData[0].message).toBe("I am happy:)");
});

test("deleting a post ", () => {
  const action = deletePost(1);
  let newState = profileReducer(state, action);
  expect(newState.postData.length).toBe(2);
});
