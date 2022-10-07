const Contact = props => {
  return (
    <div>
      <h2>{props.name}</h2>
      <h2>{props.phone}</h2>
      <h2>{props.email}</h2>
    </div>
  )
}

export default Contact;