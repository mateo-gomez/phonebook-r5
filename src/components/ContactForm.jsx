import Button from './Button'

const ContactForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className='contact-form'>
      <section>
        <h2>Contact information</h2>

        <p>
          <label htmlFor='first_name'>
            <span>First name: </span>

            <strong>
              <span aria-label='required'>*</span>
            </strong>
          </label>
          <input type='text' id='first_name' name='first_name' autoFocus='on' />
        </p>
        <p>
          <label htmlFor='last_name'>
            <span>Last name: </span>

            <strong>
              <span aria-label='required'>*</span>
            </strong>
          </label>
          <input type='text' id='last_name' name='last_name' />
        </p>
        <p>
          <label htmlFor='phone_number'>
            <span>Phone: </span>

            <strong>
              <span aria-label='required'>*</span>
            </strong>
          </label>
          <input type='tel' id='phone_number' name='phone_number' />
        </p>
      </section>

      <Button type='submit'>Add</Button>
    </form>
  )
}

export default ContactForm
