import Vue from 'vue';
import { expect } from 'chai';
import Page from './layout';

describe('LayoutPage', function () {
    it('should render correct contents', () => {
        const Constructor = Vue.extend(Page);
        const vm = new Constructor().$mount();
      });
});
