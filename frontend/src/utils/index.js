import { adminHomeRoute, clientHomeRoute, FRONT_END_ROUTE, organizationHomeRoute, studentHomeRoute, studentLoginRoute } from "../config"

export const isUserLoggedIn = () => localStorage.getItem('user')
export const getUserData = () => JSON.parse(localStorage.getItem('user'))
export const setUserData = (user,accessToken,refreshToken) => {
    localStorage.user = JSON.stringify(user)
    localStorage.accessToken = accessToken
    localStorage.refreshToken = refreshToken
}
        
export const logout = () => {localStorage.clear();window.location = FRONT_END_ROUTE}
export const formatDate = (value,formatting = {month:'short',dat:'numeric',year:'numeric'}) => {
    if(!value) return value
    return new Intl.DateTimeFormat('en-US',formatting).format(new Date(value))
}

export const isToday = date => {
    const today = new Date()
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() ===  today.getFullYear()
    )
}

export const kFormatter = num => (num>999? `${(num/1000).toFixed(1)}k` : num)

export const isObjectEmpty = obj => Object.keys(obj).length === 0

export const getHomeRouteForLoggedInUser = role => {
    if(role === 'admin') return adminHomeRoute
    if(role === 'organization') return organizationHomeRoute
    if(role === 'student') return studentHomeRoute
    return studentLoginRoute
}

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 }

 Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
      return titleCase(this)
    },
    enumerable: false
  });

  Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
  }