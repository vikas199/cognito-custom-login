import {validatePassword} from './validatePassword'
import React from 'react'
import LoginPage from '../components/LoginPage'
import { shallow } from 'enzyme'

describe('validatePassword', () => {
  const wrapper = shallow(<LoginPage/>)
  const instance = wrapper.instance()
  it('validates when password meet all requirements', () => {
    const password = 'Email@123'
    validatePassword(instance, password)
    expect(instance.state.maxLength).toEqual(true)
    expect(instance.state.lowerCase).toEqual(true)
    expect(instance.state.upperCase).toEqual(true)
    expect(instance.state.specialCharacter).toEqual(true)
    expect(instance.state.number).toEqual(true)
  })

  it('validates when password does not meet any of the requirements', () => {
    const password = ''
    validatePassword(instance, password)
    expect(instance.state.maxLength).toEqual(false)
    expect(instance.state.lowerCase).toEqual(false)
    expect(instance.state.upperCase).toEqual(false)
    expect(instance.state.specialCharacter).toEqual(false)
    expect(instance.state.number).toEqual(false)
  })

  it('validates when password does not meet maxLength, upperCase, specialCharacter requirements', () => {
    const password = 'mail23'
    validatePassword(instance, password)
    expect(instance.state.maxLength).toEqual(false)
    expect(instance.state.lowerCase).toEqual(true)
    expect(instance.state.upperCase).toEqual(false)
    expect(instance.state.specialCharacter).toEqual(false)
    expect(instance.state.number).toEqual(true)
  })

  it('validates when password does not meet lowerCase and number requirements', () => {
    const password = 'PASSWORD@'
    validatePassword(instance, password)
    expect(instance.state.maxLength).toEqual(true)
    expect(instance.state.lowerCase).toEqual(false)
    expect(instance.state.upperCase).toEqual(true)
    expect(instance.state.specialCharacter).toEqual(true)
    expect(instance.state.number).toEqual(false)
  })
})
