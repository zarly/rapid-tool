import Vue from 'vue';
import { expect } from 'chai';
import Page from './forget';

describe('ForgetPage', function () {
    it('should render correct contents', () => {
        const Constructor = Vue.extend(Page);
        const vm = new Constructor().$mount();
      });
});
