import React from 'react'
import { shallow } from 'enzyme'
import ForgotPasswordForm from './ForgotPasswordForm'

describe('ForgotPasswordForm.js Tests', () => {
  it('should require correct params', () => {
    let mock = jest.fn()
    // eslint-disable-next-line no-console
    console.error = mock

    shallow(<ForgotPasswordForm/>)

    expect(mock).toHaveBeenCalledTimes(3)
    let concat = [].concat(...mock.mock.calls)

    expect(concat.some((element) => { return element.includes('`email` is marked as required') })).toBe(true)
    expect(concat.some((element) => { return element.includes('`onChange` is marked as required') })).toBe(true)
    expect(concat.some((element) => { return element.includes('`onSubmit` is marked as required') })).toBe(true)
  })

  it('should display `Password Reset` at top', () => {
    const wrapper = shallow(<ForgotPasswordForm/>)

    let h1 = wrapper.find('h1')

    expect(h1).toHaveLength(1)
    expect(h1.text()).toEqual('Password Reset')
  })

  it('should pass errorMsg to <Alert>', () => {
    let mock = jest.fn()
    const wrapper = shallow(<ForgotPasswordForm email="a" onChange={mock} onSubmit={mock} errorMsg="some_message"/>)

    const UserMessage = wrapper.find('.forgetPasswordAlert')
    expect(UserMessage).toHaveLength(1)
    expect(UserMessage.props().children).toEqual('some_message')
  })

  it('should display instructions', () => {
    const wrapper = shallow(<ForgotPasswordForm/>)

    const label = wrapper.find('label')

    expect(label).toHaveLength(1)
    expect(label.text()).toEqual('Enter your login email below and we will send a message to reset your password')
  })

  it('contains text input for email', () => {
    let mock = jest.fn()
    const wrapper = shallow(<ForgotPasswordForm email="a" onChange={mock} onSubmit={mock}/>)

    let input = wrapper.find('input')

    expect(input).toHaveLength(1)
    expect(input.props().id).toEqual('email')
    expect(input.props().placeholder).toEqual('Email')
  })

  it('lets component manage email value', () => {
    let onChange = jest.fn()
    let onSubmit = jest.fn()
    const wrapper = shallow(<ForgotPasswordForm email="a@test.com" onChange={onChange} onSubmit={onSubmit}/>)

    let input = wrapper.find('input')

    expect(input).toHaveLength(1)
    expect(input.props().value).toEqual('a@test.com')
  })

  it('calls correct callback onChange', () => {
    let onChange = jest.fn()
    let onSubmit = jest.fn()
    const wrapper = shallow(<ForgotPasswordForm email="a@test.com" onChange={onChange} onSubmit={onSubmit}/>)

    let input = wrapper.find('input')

    expect(input).toHaveLength(1)
    expect(input.props().onChange).toEqual(onChange)
  })

  it('contains submit button and cancel button', () => {
    let onChange = jest.fn()
    let onSubmit = jest.fn()
    const wrapper = shallow(<ForgotPasswordForm email="a@test.com" onChange={onChange} onSubmit={onSubmit}/>)

    let button = wrapper.find('button')

    expect(button).toHaveLength(2)
  })

  it('has correct text on submit button', () => {
    let onChange = jest.fn()
    let onSubmit = jest.fn()
    const wrapper = shallow(<ForgotPasswordForm email="a@test.com" onChange={onChange} onSubmit={onSubmit}/>)

    let button = wrapper.find('button')

    expect(button.at(1).props().children).toEqual('Reset my password')
  })

  it('calls correct callback onClick', () => {
    let onChange = jest.fn()
    let onSubmit = jest.fn()
    const wrapper = shallow(<ForgotPasswordForm email="a@test.com" onChange={onChange} onSubmit={onSubmit}/>)

    let button = wrapper.find('button')

    expect(button).toHaveLength(2)
    expect(button.at(1).props().onClick).toEqual(onSubmit)
  })

  it('has correct text on cancel button', () => {
    let onChange = jest.fn()
    let onSubmit = jest.fn()
    let onCancel = jest.fn()
    const wrapper = shallow(<ForgotPasswordForm email="a@test.com" onChange={onChange} onSubmit={onSubmit} onCancel={onCancel}/>)

    let button = wrapper.find('button')

    expect(button.at(0).props().children).toEqual('Cancel')
  })

  it('calls correct callback onClick', () => {
    let onChange = jest.fn()
    let onSubmit = jest.fn()
    let onCancel = jest.fn()
    const wrapper = shallow(<ForgotPasswordForm email="a@test.com" onChange={onChange} onSubmit={onSubmit} onCancel={onCancel}/>)

    let button = wrapper.find('button')

    expect(button.at(0).props().onClick).toEqual(onCancel)
  })
})
