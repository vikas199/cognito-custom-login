import React from 'react';
import { shallow } from 'enzyme';
import MfaForm from './MfaForm';

describe('MfaForm.js Tests', () => {  
    it('should require correct params', () => {
        let mock = jest.fn();
        // eslint-disable-next-line no-console
        console.error = mock;

        shallow(<MfaForm/>);
        
        expect(mock).toHaveBeenCalledTimes(2);
        let concat = [].concat(...mock.mock.calls);

        expect(concat.some((element) => { return element.includes("`onCodeChange` is marked as required") })).toBe(true);
        expect(concat.some((element) => { return element.includes("`onValidate` is marked as required") })).toBe(true);
    });

    it('should display `Account Verification` at top', () => {
        const wrapper = shallow(<MfaForm/>);

        let h1 = wrapper.find('h1');

        expect(h1).toHaveLength(1);
        expect(h1.text()).toEqual('Account Verification');
    });

    describe('instructions Tests', () => { 
        it('should display instructions', () => {
            const wrapper = shallow(<MfaForm maskedEmail="a@test.com"/>);
    
            let span = wrapper.find('span');
    
            expect(span).toHaveLength(3);
            expect(span.at(0).text()).toEqual('For additional security, we need to verify your account.');
            expect(span.at(1).text()).toEqual('We have sent a verfication code by email to a@test.com');
            expect(span.at(2).text()).toEqual('Please enter it below to complete verification.');
        });
    });

    describe('code input Tests', () => {  
        it('contains label', () => {
            let mock = jest.fn();
            const wrapper = shallow(<MfaForm maskedEmail="a@test.com" code="the_code" onCodeChange={mock} onValidate={mock}/>);

            let label = wrapper.find('label');

            expect(label).toHaveLength(1);
            expect(label.text()).toEqual('Code');
        });

        it('contains text input for code', () => {
            let mock = jest.fn();
            const wrapper = shallow(<MfaForm maskedEmail="a@test.com" code="the_code" onCodeChange={mock} onValidate={mock}/>);

            let input = wrapper.find('input');

            expect(input).toHaveLength(1);
            expect(input.props().id).toEqual('code');
        });

        it('lets component manage code value', () => {
            let mock = jest.fn();
            const wrapper = shallow(<MfaForm maskedEmail="a@test.com" code="the_code" onCodeChange={mock} onValidate={mock}/>);

            let input = wrapper.find('input');

            expect(input).toHaveLength(1);
            expect(input.props().value).toEqual('the_code');
        });

        
        it('has type of password', () => {
            let mock = jest.fn();
            const wrapper = shallow(<MfaForm maskedEmail="a@test.com" code="the_code" onCodeChange={mock} onValidate={mock}/>);

            let input = wrapper.find('input');

            expect(input).toHaveLength(1);
            expect(input.props().type).toEqual('password');
        });

        it('calls correct callback onChange', () => {
            let mock = jest.fn();
            let onCodeChange = jest.fn();
            const wrapper = shallow(<MfaForm maskedEmail="a@test.com" code="the_code" onCodeChange={onCodeChange} onValidate={mock}/>);

            let input = wrapper.find('input');

            expect(input).toHaveLength(1);
            expect(input.props().onChange).toEqual(onCodeChange);
        }); 
    });

    describe('submit button Tests', () => {  
        it('contains submit button', () => {
            let mock = jest.fn();
            const wrapper = shallow(<MfaForm maskedEmail="a@test.com" code="the_code" onCodeChange={mock} onValidate={mock}/>);

            let button = wrapper.find('button');

            expect(button).toHaveLength(1);
        });

        it('has correct text on submit button', () => {
            let mock = jest.fn();
            const wrapper = shallow(<MfaForm maskedEmail="a@test.com" code="the_code" onCodeChange={mock} onValidate={mock}/>);

            let button = wrapper.find('button');

            expect(button.text()).toEqual('Verify');
        });

        it('calls correct callback onClick', () => {
            let mock = jest.fn();
            let onSubmit = jest.fn();
            const wrapper = shallow(<MfaForm maskedEmail="a@test.com" code="the_code" onCodeChange={mock} onValidate={onSubmit}/>);

            let button = wrapper.find('button');

            expect(button).toHaveLength(1);
            expect(button.props().onClick).toEqual(onSubmit);
        }); 
    });
});