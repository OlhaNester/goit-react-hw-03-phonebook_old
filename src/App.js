import { Component } from "react";
import "./App.css";
import Container from "./components/Container";
import Form from "./components/Form";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  //добавляет контакт
  addContact = ({ id, name, number }) => {
    const { contacts } = this.state;
    const contact = {
      id,
      name,
      number,
    };
    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
    } else
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
  };

  // удаляет контакт
  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };
  //значение фильтра записываем в стейт
  changeFilter = (event) => {
    this.setState({ filter: event.currentTarget.value });
  };
  //фильтрует контакты
  getFilterContact = () => {
    const { contacts, filter } = this.state;
    const normaFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normaFilter)
    );
  };
  // вызывается один раз при загрузке
  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  //вызывается после изменения состояния или свойств
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;

    const filterContacts = this.getFilterContact();

    return (
      <Container>
        <h1>Phonebook</h1>
        <Form onSubmit={this.addContact} />

        <h2>Contacts </h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={filterContacts}
          onDeleteContact={this.deleteContact}
          title="Contacts"
        />
      </Container>
    );
  }
}

export default App;
