import Vue from 'vue'

export default function auth () {
    let token = Vue.$cookies.get('token')
    if (token) {
        return { 'Authorization': `Bearer ${token}` }
    } else {
        return undefined
    }
}
