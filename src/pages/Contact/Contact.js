import React from 'react';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import { init, sendForm } from 'emailjs-com';
import styles from '../../styles/ContactStyles';

init(process.env.REACT_APP_EMAILJS_ID);

const Contact = (props) => {
  const { classes } = props;

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const form = document.querySelector('#contact-form');

    console.log(data);
    sendForm('contact_form', 'template_xu5gbwo', '#contact-form').then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
        form.reset();
      },
      (error) => {
        console.log('FAILED...', error);
      }
    );
  };

  return (
    <div className={classes.background}>
      <div
        style={{ height: '48px', backgroundColor: 'rgba(0, 180, 249, 0.872)' }}
      ></div>
      <div className={classes.heading}>
        <h2 className={classes.title}>Get in touch!</h2>
        <p className={classes.prompt}>
          <span className={classes.firstLine}>Experiencing any issues?</span>
          <span>
            Use the form below to submit a ticket, and we'll get back to you as
            soon as possible.
          </span>
        </p>
      </div>
      <form
        id='contact-form'
        onSubmit={handleSubmit(onSubmit)}
        className={classes.form}
      >
        <input
          type='text'
          name='name'
          variant='filled'
          placeholder='Name'
          maxLength='30'
          className={classes.input}
          ref={register({ required: true })}
        />
        <input
          type='text'
          name='email'
          variant='filled'
          placeholder='Email'
          maxLength='30'
          className={classes.input}
          ref={register({ required: true })}
        />
        <textarea
          type='text'
          name='message'
          variant='filled'
          placeholder='Message'
          maxLength='1500'
          className={classes.textarea}
          ref={register({ required: true })}
        />
        <Button type='submit' className={classes.submitBtn} variant='contained'>
          Send
        </Button>
      </form>
    </div>
  );
};

export default withStyles(styles)(Contact);
