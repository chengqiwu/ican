import createHistory from 'history/createBrowserHistory'
const supportsHistory = 'pushState' in window.history
console.log(supportsHistory)
export default createHistory({
    
  basename: '/',
  forceRefresh: true
})