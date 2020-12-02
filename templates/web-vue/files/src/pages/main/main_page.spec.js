import Vue from 'vue';
import { expect } from 'chai';
import Page from './main_page';

describe('MainPage', function () {
  it('should renders without errors', () => {
    const Constructor = Vue.extend(Page);
    const vm = new Constructor().$mount();
  });
});
