const ContactForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className='contact-form'>
      <section>
        <h2>Contact information</h2>

        <p>
          <label for='first_name'>
            <span>First name: </span>

            <strong>
              <span aria-label='required'>*</span>
            </strong>
          </label>
          <input type='text' id='first_name' name='first_name' autoFocus='on' />
        </p>
        <p>
          <label for='last_name'>
            <span>Last name: </span>

            <strong>
              <span aria-label='required'>*</span>
            </strong>
          </label>
          <input type='text' id='last_name' name='last_name' />
        </p>
        <p>
          <label for='phone_number'>
            <span>Phone: </span>

            <strong>
              <span aria-label='required'>*</span>
            </strong>
          </label>
          <input type='tel' id='phone_number' name='phone_number' />
        </p>
      </section>

      <button type='submit'>Add</button>
    </form>
  )
}

export default ContactForm
