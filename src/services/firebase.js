import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDGxvJFk5jV0xxSoMmIJTbrYNptYxAVrxk',
  authDomain: 'idozer-4246a.firebaseapp.com',
  databaseURL: 'https://idozer-4246a-default-rtdb.firebaseio.com',
  projectId: 'idozer-4246a',
  storageBucket: 'idozer-4246a.appspot.com',
  messagingSenderId: '236050345521',
  appId: '1:236050345521:web:e290a37fd955f20872ef10'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)