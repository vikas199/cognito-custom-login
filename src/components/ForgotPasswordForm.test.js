import React from 'react';
import { shallow } from 'enzyme';
import ForgotPasswordForm from './ForgotPasswordForm';
import ErrorMessage from './ErrorMessage';

describe('ForgotPasswordForm.js Tests', () => {  
    it('should require correct params', () => {
        let mock = jest.fn();
        // eslint-disable-next-line no-console
        console.error = mock;

        shallow(<ForgotPasswordForm/>);
        
        expect(mock).toHaveBeenCalledTimes(3);
        let concat = [].concat(...mock.mock.calls);
        
        expect(concat.some((element) => { return element.includes("`email` is marked as required") })).toBe(true);
        expect(concat.some((element) => { return element.includes("`onChange` is marked as required") })).toBe(true);
        expect(concat.some((element) => { return element.includes("`onSubmit` is marked as required") })).toBe(true);
    });

    it('should display `Password Reset` at top', () => {
        const wrapper = shallow(<ForgotPasswordForm/>);

        let h1 = wrapper.find('h1');

        expect(h1).toHaveLength(1);
        expect(h1.text()).toEqual('Password Reset');
    });

    it('should pass errorMsg to <ErrorMessage>', () => {
        let mock = jest.fn();
        const wrapper = shallow(<ForgotPasswordForm email="a" onChange={mock} onSubmit={mock} errorMsg="some_message"/>);

        let errorMessageTag = wrapper.find(ErrorMessage);
        expect(errorMessageTag).toHaveLength(1);
        expect(errorMessageTag.props().msg).toEqual('some_message');
    });
    
    it('should display instructions', () => {
        const wrapper = shallow(<ForgotPasswordForm/>);

        let span = wrapper.find('span');

        expect(span).toHaveLength(1);
        expect(span.text()).toEqual('Enter your login email below and we will send a message to reset your password');
    });

    it('contains text input for email', () => {
        let mock = jest.fn();
        const wrapper = shallow(<ForgotPasswordForm email="a" onChange={mock} onSubmit={mock}/>);

        let input = wrapper.find('input');

        expect(input).toHaveLength(1);
        expect(input.props().id).toEqual('email');
        expect(input.props().placeholder).toEqual('Email');
    });

    it('lets component manage email value', () => {
        let onChange = jest.fn();
        let onSubmit = jest.fn();
        const wrapper = shallow(<ForgotPasswordForm email="a@test.com" onChange={onChange} onSubmit={onSubmit}/>);

        let input = wrapper.find('input');

        expect(input).toHaveLength(1);
        expect(input.props().value).toEqual('a@test.com');
    });

    it('calls correct callback onChange', () => {
        let onChange = jest.fn();
        let onSubmit = jest.fn();
        const wrapper = shallow(<ForgotPasswordForm email="a@test.com" onChange={onChange} onSubmit={onSubmit}/>);

        let input = wrapper.find('input');

        expect(input).toHaveLength(1);
        expect(input.props().onChange).toEqual(onChange);
    });

    it('contains submit button', () => {
        let onChange = jest.fn();
        let onSubmit = jest.fn();
        const wrapper = shallow(<ForgotPasswordForm email="a@test.com" onChange={onChange} onSubmit={onSubmit}/>);

        let button = wrapper.find('button');

        expect(button).toHaveLength(1);
    });

    it('has correct text on submit button', () => {
        let onChange = jest.fn();
        let onSubmit = jest.fn();
        const wrapper = shallow(<ForgotPasswordForm email="a@test.com" onChange={onChange} onSubmit={onSubmit}/>);

        let button = wrapper.find('button');

        expect(button.text()).toEqual('Reset my password');
    });

    it('calls correct callback onClick', () => {
        let onChange = jest.fn();
        let onSubmit = jest.fn();
        const wrapper = shallow(<ForgotPasswordForm email="a@test.com" onChange={onChange} onSubmit={onSubmit}/>);

        let button = wrapper.find('button');

        expect(button).toHaveLength(1);
        expect(button.props().onClick).toEqual(onSubmit);
    });
});