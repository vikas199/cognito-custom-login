import React from 'react'
import { shallow } from 'enzyme'
import LoginForm from './LoginForm'
import ErrorMessage from './ErrorMessage'

describe('LoginForm.js Tests', () => {
  it('should require correct params', () => {
    let mock = jest.fn()
    // eslint-disable-next-line no-console
    console.error = mock

    shallow(<LoginForm/>)

    expect(mock).toHaveBeenCalledTimes(5)
    let concat = [].concat(...mock.mock.calls)

    expect(concat.some((element) => { return element.includes('`onSubmit` is marked as required') })).toBe(true)
    expect(concat.some((element) => { return element.includes('`email` is marked as required') })).toBe(true)
    expect(concat.some((element) => { return element.includes('`password` is marked as required') })).toBe(true)
    expect(concat.some((element) => { return element.includes('`onEmailChange` is marked as required') })).toBe(true)
    expect(concat.some((element) => { return element.includes('`onPasswordChange` is marked as required') })).toBe(true)
  })

  it('should display `Log In` at top', () => {
    const wrapper = shallow(<LoginForm/>)

    let h1 = wrapper.find('h1')

    expect(h1).toHaveLength(1)
    expect(h1.text()).toEqual('Log In')
  })

  it('should pass errorMsg to <ErrorMessage>', () => {
    let mock = jest.fn()
    const wrapper = shallow(<LoginForm
      email="a"
      passowrd="thepassword"
      onSubmit={mock}
      onEmailChange={mock}
      onPasswordChange={mock}
      errorMsg="some_message"/>)

    let errorMessageTag = wrapper.find(ErrorMessage)
    expect(errorMessageTag).toHaveLength(1)
    expect(errorMessageTag.props().msg).toEqual('some_message')
  })

  describe('email input Tests', () => {
    let mock = jest.fn()
    let mockToVerify = jest.fn()
    let wrapper = shallow(<LoginForm
      email="a@test.com"
      password="thepassword"
      onSubmit={mock}
      onEmailChange={mockToVerify}
      onPasswordChange={mock}
      errorMsg="some_message"/>)

    afterEach(() => {
      mockToVerify.mockReset()
    })

    it('contains label', () => {
      let label = wrapper.find('label')

      expect(label).toHaveLength(2)
      expect(label.at(0).text()).toEqual('Email')
    })

    it('contains text input for email', () => {
      let input = wrapper.find('input')

      expect(input).toHaveLength(2)
      expect(input.at(0).props().id).toEqual('email')
      expect(input.at(0).props().placeholder).toEqual('Email')
    })

    it('lets component manage email value', () => {
      let input = wrapper.find('input')

      expect(input).toHaveLength(2)
      expect(input.at(0).props().value).toEqual('a@test.com')
    })

    it('has type of text', () => {
      let input = wrapper.find('input')

      expect(input).toHaveLength(2)
      expect(input.at(0).props().type).toEqual('text')
    })

    it('calls correct callback onChange', () => {
      let input = wrapper.find('input')

      expect(input).toHaveLength(2)
      expect(input.at(0).props().onChange).toEqual(mockToVerify)
    })
  })

  describe('password input Tests', () => {
    let mock = jest.fn()
    let mockToVerify = jest.fn()
    let wrapper = shallow(<LoginForm
      email="a@test.com"
      password="thepassword"
      onSubmit={mock}
      onEmailChange={mock}
      onPasswordChange={mockToVerify}
      errorMsg="some_message"/>)

    afterEach(() => {
      mockToVerify.mockReset()
    })

    it('contains label', () => {
      let label = wrapper.find('label')

      expect(label).toHaveLength(2)
      expect(label.at(1).text()).toEqual('Password')
    })

    it('contains text input for password', () => {
      let input = wrapper.find('input')

      expect(input).toHaveLength(2)
      expect(input.at(1).props().id).toEqual('password')
      expect(input.at(1).props().placeholder).toEqual('Password')
    })

    it('lets component manage password value', () => {
      let input = wrapper.find('input')

      expect(input).toHaveLength(2)
      expect(input.at(1).props().value).toEqual('thepassword')
    })

    it('has type of password', () => {
      let input = wrapper.find('input')

      expect(input).toHaveLength(2)
      expect(input.at(1).props().type).toEqual('password')
    })

    it('calls correct callback onChange', () => {
      let input = wrapper.find('input')

      expect(input).toHaveLength(2)
      expect(input.at(1).props().onChange).toEqual(mockToVerify)
    })
  })

  describe('submit button Tests', () => {
    let mock = jest.fn()
    let mockToVerify = jest.fn()
    const disableSignIn = false
    const wrapper = shallow(<LoginForm
      email="a@test.com"
      password="thepassword"
      onSubmit={mockToVerify}
      onEmailChange={mock}
      onPasswordChange={mock}
      disableSignIn={disableSignIn}
      errorMsg="some_message"/>)

    afterEach(() => {
      mockToVerify.mockReset()
    })

    it('contains submit button', () => {
      let button = wrapper.find('button')

      expect(button).toHaveLength(1)
    })

    it('has correct text on submit button', () => {
      let button = wrapper.find('button')

      expect(button.text()).toEqual('Sign In')
    })

    it('calls correct callback onClick', () => {
      let button = wrapper.find('button')

      expect(button).toHaveLength(1)
      expect(button.props().onClick).toEqual(mockToVerify)
    })
    it('check if submit button is disabled or not', () => {
      let button = wrapper.find('button')
      expect(button.props().disabled).toEqual(disableSignIn)
    })
    it('check if submit button is disabled or not', () => {
      const wrapper = shallow(<LoginForm
        email="a@test.com"
        password="thepassword"
        onSubmit={mockToVerify}
        onEmailChange={mock}
        onPasswordChange={mock}
        disableSignIn={true}
        errorMsg="some_message"/>)
      const button = wrapper.find('button')
      expect(button.text()).toEqual('Loading....')
    })
  })
})
