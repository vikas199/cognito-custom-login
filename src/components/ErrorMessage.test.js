import React from 'react'
import { shallow } from 'enzyme'
import ErrorMessage from './ErrorMessage'

describe('ErrorMessage.js Tests', () => {
  it('should display nothing with undefined message', () => {
    const wrapper = shallow(<ErrorMessage/>)

    let topDiv = wrapper.find('div').at(0)

    expect(wrapper.find('div')).toHaveLength(2)
    expect(topDiv.props().style.display).toEqual('none')
  })

  it('should display nothing with empty message', () => {
    const wrapper = shallow(<ErrorMessage msg=""/>)

    let topDiv = wrapper.find('div').at(0)

    expect(wrapper.find('div')).toHaveLength(2)
    expect(topDiv.props().style.display).toEqual('none')
  })

  it('should display when message passed in', () => {
    const wrapper = shallow(<ErrorMessage msg="some_message"/>)

    let topDiv = wrapper.find('div').at(0)

    expect(wrapper.find('div')).toHaveLength(2)
    expect(topDiv.props().style.display).toEqual('block')
  })

  it('should display message when message passed in', () => {
    const wrapper = shallow(<ErrorMessage msg="some_message"/>)

    let insideDiv = wrapper.find('div').at(1)

    expect(wrapper.find('div')).toHaveLength(2)
    expect(insideDiv.text()).toEqual('some_message')
  })
})
