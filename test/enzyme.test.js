
import React from 'react'
import {shallow, mount, render} from 'enzyme'
import {expect} from 'chai'
import Header from '../src/containers/Header'
import ShowLists from '../src/containers/ShowLists'

import Lists from '../src/components/Lists'

describe('Enzyme Shallow', () => {
    it('App\'s title should be title', () => {
        let app = shallow(<Header/>)
        expect(app.find('h1').text()).to.equal('title')
    })
})
describe('Enzyme Render', function () {
    it('Todo item should not have todo-done class', function () {
      let app = mount(<ShowLists/>);
      
      let search = app.find('.search').at(0)
      let table = app.find('table').at(0)
      search.simulate('click')
      expect(table.hasClass('.hiden')).to.equal(false);
    });
  });
// describe('Enzyme Mount', () => {
//     const lists = [
//         { 'name': 'ctitle',
//         'area': 444441,
//         'id': '1233dsada'}, { 'name': 'ctitle',
//         'area': 444441,
//         'id': '1233dsada'}, { 'name': 'ctitle',
//         'area': 444441,
//         'id': '1233dsada'}
//     ]
//     it('test list component', () => {
//         let app = mount(<Lists lists={lists} edit={(id)=>{}}/>)
//         let search = app.find('.search').at(0)
//         let listItems = app.find('tbody').find('tr')
//         // search.simulate('click')
//         expect(listItems.length).to.equal(lists.length)
//     })
// })