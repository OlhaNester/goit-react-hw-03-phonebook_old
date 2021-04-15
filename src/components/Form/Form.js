import { Component } from 'react';
import shortid from 'shortid';
import styles from './Form.module.css';
import PropTypes from 'prop-types';

class Form extends Component {
  state = {
    name: '',
    number: '',
    id: '',
  };

  //унифицированный метод, обновляющий стейт
  handleChange = event => {
    // console.log(event.currentTarget.name);
    // console.log(event.currentTarget.value);
    // this.setState({ [event.currentTarget.name]: event.currentTarget.value });

    const { name, value } = event.currentTarget;
    this.setState({ [name]: value, id: shortid.generate() });
  };
  //метод отправки формы
  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);

    this.props.onSubmit(this.state);
    this.reset();
  };

  //очистка формы
  reset = () => {
    this.setState({ id: '', name: '', number: '' });
  };
  render() {
    //диструктуризация
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <label>
          Name{' '}
          <input
            className={styles.input}
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </label>
        <label>
          Number{' '}
          <input
            className={styles.input}
            type="tel"
            name="number"
            value={number}
            onChange={this.handleChange}
            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
            required
          />
        </label>
        <button type="submit" className={styles.button}>
          Add contact
        </button>
      </form>
    );
  }
}
Form.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
};
export default Form;
