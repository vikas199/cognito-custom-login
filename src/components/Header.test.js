import React from 'react'
import { shallow } from 'enzyme'
import Header from './Header'

describe('ErrorMessage.js Tests', () => {
  it('should display correct image', () => {
    const wrapper = shallow(<Header/>)

    let img = wrapper.find('img')

    expect(img).toHaveLength(1)
    expect(img.at(0).props().src).toEqual('http://integration.cwds.io.s3-website-us-west-2.amazonaws.com/ALL/images/logo-lockup@2x.jpg')
  })

  it('should center image', () => {
    const wrapper = shallow(<Header/>)

    let img = wrapper.find('img')

    expect(img.at(0).parent().is('center')).toEqual(true)
  })
})
