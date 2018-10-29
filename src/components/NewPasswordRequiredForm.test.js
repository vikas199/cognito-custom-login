import React from 'react'
import { shallow } from 'enzyme'
import NewPasswordRequiredForm from './NewPasswordRequiredForm'

describe('NewPasswordRequiredForm.js Tests', () => {
  it('should require correct params', () => {
    let mock = jest.fn()
    // eslint-disable-next-line no-console
    console.error = mock

    shallow(<NewPasswordRequiredForm/>)

    expect(mock).toHaveBeenCalledTimes(3)
    let concat = [].concat(...mock.mock.calls)

    expect(concat.some((element) => { return element.includes('`onNewPasswordChange` is marked as required') })).toBe(true)
    expect(concat.some((element) => { return element.includes('`onConfirmPasswordChange` is marked as required') })).toBe(true)
    expect(concat.some((element) => { return element.includes('`onSubmit` is marked as required') })).toBe(true)
  })

  it('should display `Password Reset` at top', () => {
    let mock = jest.fn()
    const wrapper = shallow(<NewPasswordRequiredForm onNewPasswordChange={mock} onConfirmPasswordChange={mock} onSubmit={mock}/>)

    let h1 = wrapper.find('h1')

    expect(h1).toHaveLength(1)
    expect(h1.text()).toEqual('Update Password')
  })

  it('should pass errorMsg to <Alert>', () => {
    let mock = jest.fn()
    const wrapper = shallow(<NewPasswordRequiredForm errorMsg="some_message" onNewPasswordChange={mock} onConfirmPasswordChange={mock} onSubmit={mock}/>)

    const UserMessage = wrapper.find('.newPasswordRequiredAlert')
    expect(UserMessage).toHaveLength(1)
    expect(UserMessage.props().children).toEqual('some_message')
  })

  it('contains text input for new password', () => {
    let mock = jest.fn()
    const wrapper = shallow(<NewPasswordRequiredForm newPassword="New Password" onNewPasswordChange={mock} onConfirmPasswordChange={mock} onSubmit={mock}/>)

    let input = wrapper.find('input')

    expect(input).toHaveLength(2)
    expect(input.at(0).props().id).toEqual('newPassword')
  })

  it('lets component manage new password value', () => {
    let mock = jest.fn()
    const wrapper = shallow(<NewPasswordRequiredForm newPassword="New Password" onNewPasswordChange={mock} onConfirmPasswordChange={mock} onSubmit={mock}/>)

    let input = wrapper.find('input')

    expect(input).toHaveLength(2)
    expect(input.at(0).props().value).toEqual('New Password')
  })

  it('calls correct callback onChange for new password', () => {
    let mock = jest.fn()
    let onChange = jest.fn()
    const wrapper = shallow(<NewPasswordRequiredForm newPassword="New Password" onNewPasswordChange={onChange} onConfirmPasswordChange={mock} onSubmit={mock}/>)

    let input = wrapper.find('input')

    expect(input).toHaveLength(2)
    expect(input.at(0).props().onChange).toEqual(onChange)
  })

  it('contains passwordInstructions', () => {
    const wrapper = shallow(<NewPasswordRequiredForm validateLowerCase={false} validateSpecialCharacter={false} validateUpperCase={false} validateNumber={false} validateLength={false}/>)

    let passwordInstructions = wrapper.find('PasswordInstructions')
    let props = {validateUpperCase: false, validateNumber: false, validateLength: false, validateLowerCase: false, validateSpecialCharacter: false}

    expect(passwordInstructions.length).toEqual(1)
    expect(passwordInstructions.props()).toEqual(props)
  })

  it('contains text input for confirmPassword', () => {
    let mock = jest.fn()
    const wrapper = shallow(<NewPasswordRequiredForm confirmPassword="New Password" onNewPasswordChange={mock} onConfirmPasswordChange={mock} onSubmit={mock}/>)

    let input = wrapper.find('input')

    expect(input).toHaveLength(2)
    expect(input.at(1).props().id).toEqual('confirmPassword')
  })

  it('lets component manage confirmPassword value', () => {
    let mock = jest.fn()
    const wrapper = shallow(<NewPasswordRequiredForm confirmPassword="New Password" onNewPasswordChange={mock} onConfirmPasswordChange={mock} onSubmit={mock}/>)

    let input = wrapper.find('input')

    expect(input).toHaveLength(2)
    expect(input.at(1).props().value).toEqual('New Password')
  })

  it('calls correct callback onChange for confirmPassword', () => {
    let mock = jest.fn()
    let onChange = jest.fn()
    const wrapper = shallow(<NewPasswordRequiredForm confirmPassword="New Password" onNewPasswordChange={mock} onConfirmPasswordChange={onChange} onSubmit={mock}/>)

    let input = wrapper.find('input')

    expect(input).toHaveLength(2)
    expect(input.at(1).props().onChange).toEqual(onChange)
  })

  it('contains submit button', () => {
    let mock = jest.fn()
    let onChange = jest.fn()
    let onSubmit = jest.fn()
    const wrapper = shallow(<NewPasswordRequiredForm confirmPassword="New Password" onNewPasswordChange={mock} onConfirmPasswordChange={onChange} onSubmit={onSubmit}/>)

    let button = wrapper.find('button')

    expect(button).toHaveLength(1)
  })

  it('has correct text on submit button', () => {
    let mock = jest.fn()
    let onChange = jest.fn()
    let onSubmit = jest.fn()
    const wrapper = shallow(<NewPasswordRequiredForm confirmPassword="New Password" onNewPasswordChange={mock} onConfirmPasswordChange={onChange} onSubmit={onSubmit}/>)

    let button = wrapper.find('button')

    expect(button.text()).toEqual('Change Password')
  })

  it('calls correct callback onClick', () => {
    let mock = jest.fn()
    let onChange = jest.fn()
    let onSubmit = jest.fn()
    const wrapper = shallow(<NewPasswordRequiredForm confirmPassword="New Password" onNewPasswordChange={mock} onConfirmPasswordChange={onChange} onSubmit={onSubmit}/>)

    let button = wrapper.find('button')

    expect(button).toHaveLength(1)
    expect(button.props().onClick).toEqual(onSubmit)
  })
})
