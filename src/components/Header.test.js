import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('ErrorMessage.js Tests', () => {
    it('should display correct image', () => {
        const wrapper = shallow(<Header/>);

        let img = wrapper.find('img');

        expect(img).toHaveLength(1);
        expect(img.at(0).props().src).toEqual('https://dpp0gtxikpq3y.cloudfront.net/20180521182052/images/us-west-2_bUtASxUz6/ALL/images/image.jpg');
    });
    
    it('should center image', () => {
        const wrapper = shallow(<Header/>);

        let img = wrapper.find('img');

        expect(img.at(0).parent().is('center')).toEqual(true);
    });

});