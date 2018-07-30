import React from 'react'
import { shallow } from 'enzyme'
import Header from './Header'
import headerLogo from './../assets/images/CWS-CARES-tempLogo.png'

describe('ErrorMessage.js Tests', () => {
  it('should display correct image', () => {
    const wrapper = shallow(<Header/>)

    let img = wrapper.find('img')

    expect(img).toHaveLength(1)
    // console.log(img.at(0).props().src)
    expect(img.at(0).props().src).toEqual(headerLogo)
  })

  it('should center image', () => {
    const wrapper = shallow(<Header/>)

    let img = wrapper.find('img')

    expect(img.at(0).parent().is('center')).toEqual(true)
  })
})
