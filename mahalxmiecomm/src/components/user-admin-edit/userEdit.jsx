import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../actions/userAction";
import Message from "../message/message";
import Loader from "../loader/loader";
import FormContainer from "../form-container/FormContainer";
import { useParams } from "react-router-dom";
import { Fragment } from "react";
import { userEditFromAdmin } from "../../actions/userAction";
import { myActionsUsers } from "../../reducers/userReducers";
function EditUserScreen({ children }) {
  const params = useParams();

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const userId = params.id;

  const dispatch = useDispatch();

  //bring the initial state passed in the user reducer
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userUpdateSuccess = useSelector((state) => state.userEditAdmin);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = userUpdateSuccess;

  //if userinfo exist we want to redirect
  useEffect(() => {
    if (successUpdate) {
      dispatch( {type: myActionsUsers.EDIT_ADMIN_RESET})
        navigate("/admin/userList")
    } else {
      //if we dont have details we call the action or we update the state
      if (!user.name || parseInt(user._id) !== parseInt(userId)) {
        //that is if there is no username or the id which we get form params is not same of the user
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, userId,successUpdate,navigate]);

  const submitHandler = (e) => {
    //The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur
    e.preventDefault();
    dispatch(userEditFromAdmin({_id:user._id,name,email,isAdmin}))
  };

  return (
    <Fragment>
      <Link to="/admin/userList">Go Back</Link>
      <FormContainer>
        <h1>Edit User</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>NAME:</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Username"
                value={name}
                onChange={(event) => setName(event.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>EMAIL:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              ></Form.Control>
            </Form.Group>
            {/*
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              ></Form.Control>
            </Form.Group>
        */}

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(event) => setIsAdmin(event.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Fragment>
  );
}
export default EditUserScreen;
