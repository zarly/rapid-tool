import Vue from 'vue';
import Page from './home_page';

describe('HomePage', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Page);
    const vm = new Constructor().$mount();
  });
});
