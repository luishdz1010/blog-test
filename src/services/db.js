import firebase from 'firebase'
import 'firebase/firestore'

export const db = () => firebase.firestore()

export const blogDb = () => db().collection('blog')
