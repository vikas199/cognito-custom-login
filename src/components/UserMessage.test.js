import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'
import UserMessage from './UserMessage'

describe('UserMessage.js Tests', () => {
  it('should display only error message when error message passed as props', () => {
    const wrapper = mount(<UserMessage errorMessage="some_message"/>)

    expect(wrapper.find('.errorMessage-customizable')).toHaveLength(1)
  })

  it('should display only success message when success message passed as props', () => {
    const wrapper = mount(<UserMessage successMessage='some_message'/>)

    expect(wrapper.find('.successMessage-customizable')).toHaveLength(1)
  })

  it('should display only success message when both error and success messages are passed as props', () => {
    const wrapper = mount(<UserMessage successMessage='success_message' errorMessage='error_message'/>)

    expect(wrapper.find('.successMessage-customizable')).toHaveLength(1)
  })

  it('should display empty error message  with empty success props', () => {
    const wrapper = mount(<UserMessage successMessage='' errorMessage='error_message'/>)

    expect(wrapper.find('.errorMessage-customizable')).toHaveLength(1)
  })
})
