import React, { Component } from "react";
import FormInput from "../form-input/form-input";
import "./homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  auth,
  createUserProfileDocument,
  firestore,
} from "../../Firebase/Firebase.utils";
import Button from "../Button/Button";
class HomePage extends Component {
  unsubscribeFromAuth = null;
  state = {
    contactName: "",
    mobileNumber: "",
    getData: "",
  };
  componentDidMount() {
    const { currentUser } = this.state;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: snapShot.id,
          });
        });
      }
    });
    // const contactName = localStorage.getItem("Contact Name");
    // const mobileNumber = localStorage.getItem("Mobile NO");
    // this.setState({
    //   getData: {
    //     contactname: contactName,
    //     mobileNumber: mobileNumber,
    //   },
    // });
  }
  handleformsubmt() {
    const { getData } = this.state;
    localStorage.setItem("Contact Name", getData.contactName);
    localStorage.setItem("Mobile No", getData.mobileNumber);
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const { contactName, mobileNumber } = this.state;

    firestore
      .collection(this.state.currentUser)

      .add({
        contactname: contactName,
        mobileNumber: mobileNumber,
      })
      .then(() => {
        if (!contactName || !mobileNumber) {
          alert("please enter data");
        }
        console.log("data submitted");
      })
      .catch((er) => {
        console.log(er);
      });

    // this.setState({ contactName: "", mobileNumber: "" });
    console.log(this.state);
    firestore
      .collection(this.state.currentUser)
      .get()
      .then((snapshot) => {
        const contactData = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          contactData.push(data);
        });
        this.setState({ getData: contactData });

        console.log(snapshot);
      });
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  deleteHandler = (e) => {};

  render() {
    return (
      <div>
        <h1>Welcome</h1>
        <h2>Your Contact List</h2>
        <form onSubmit={this.handleSubmit}></form>
        <FormInput
          name="contactName"
          value={this.state.contactName}
          label="Contact Name"
          type="text"
          required
          handleChange={this.handleChange}
        />

        <FormInput
          name="mobileNumber"
          value={this.state.mobileNumber}
          label="Mobile Number"
          type="number"
          required
          handleChange={this.handleChange}
        />
        <Button type="submit" onClick={this.handleSubmit}>
          Submit
        </Button>
        <div className="contact-list-wrapper">
          {/* <div className="data">

            {this.state.getData &&
              this.state.getData.map((contact) => (
                <div className="contact-data">
                  <span>
                    <h3 className="heading-1">{contact.contactname}</h3>
                  </span>
                  <span>
                    <h3 className="heading-1">{contact.mobileNumber}</h3>
                  </span>
                </div>
              ))}
          </div> */}

          <table class="table table-primary">
            <thead>
              <tr>
                <th scope="col">Contact Name</th>
                <th scope="col">Mobile Number</th>
                <th scope="col">edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.getData &&
                this.state.getData.map((contact) => (
                  <tr onClick={this.deleteHandler}>
                    <td>{contact.contactname}</td>
                    <td>{contact.mobileNumber}</td>
                    <td onClick={this.editHandler}>
                      <i class="far fa-edit"></i>
                    </td>
                    <td>
                      <i class="fas fa-trash-alt"></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default HomePage;
