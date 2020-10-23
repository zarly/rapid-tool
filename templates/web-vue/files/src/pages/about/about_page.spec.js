import Vue from 'vue';
import Page from './about_page';

describe('AboutPage', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Page);
    const vm = new Constructor().$mount();
  });
});
