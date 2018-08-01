import React from 'react'
import { shallow } from 'enzyme'
import PasswordInstructions from './PasswordInstructions'

describe('PasswordInstructions.js Tests', () => {
  it('should display nothing with undefined message', () => {
    const wrapper = shallow(<PasswordInstructions/>)
    expect(wrapper.find('div')).toHaveLength(3)
  })
})
