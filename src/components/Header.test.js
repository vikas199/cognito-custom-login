import React from 'react'
import { shallow } from 'enzyme'
import Header from './Header'

describe('ErrorMessage.js Tests', () => {
  // it('should display correct image', () => {
  //   const wrapper = shallow(<Header/>)

  //   let img = wrapper.find('img')
  //   console.log(wrapper.debug())
  //   expect(img).toHaveLength(1)
  //   expect(img.at(0).props().src).toEqual('')
  // })

  it('should center image', () => {
    const wrapper = shallow(<Header/>)

    let img = wrapper.find('img')

    expect(img.at(0).parent().is('center')).toEqual(true)
  })
})
