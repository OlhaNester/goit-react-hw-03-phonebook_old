import React from 'react';
import styles from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={styles.ul}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={styles.contact}>
          <p className={styles.p}>{name}: </p>
          <p className={styles.p}>{number}</p>
          <button onClick={() => onDeleteContact(id)} className={styles.button}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
};
export default ContactList;
