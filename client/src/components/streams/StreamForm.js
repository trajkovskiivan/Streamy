import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';



class StreamFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  renderError({error, touched}) {
    if (touched && error) {
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      )
    }
  }
  renderInput = ({input, label, meta}) => {
    // console.log(meta)
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}: </label>
        <input {...input} autoComplete='off' />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    console.log("formValues from the onSubmit function ", formValues)
    this.props.onSubmit(formValues)
  }



  render() {
    // console.log(this.props)
    // console.log('Interaction')
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
        <Field name="title" component={this.renderInput} label='Enter TItle' />
        <Field name="description" component={this.renderInput} label='Enter Description' />
        <button className='ui button primary'>Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }
  return errors
}

export default reduxForm({
  form: 'streamForm',
  validate
})(StreamFrom);

