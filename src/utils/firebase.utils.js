import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  deleteDoc,
  query,
  orderBy,
  setDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoqEgyOgLNfOCmssu6ac5ODh1vh6waJzU",
  authDomain: "test-c13ea.firebaseapp.com",
  projectId: "test-c13ea",
  storageBucket: "test-c13ea.appspot.com",
  messagingSenderId: "1040146177231",
  appId: "1:1040146177231:web:e7543d3050acf787fe6bba",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const getPosts = async () => {
  const collectionRef = collection(db, "posts");
  const q = query(collectionRef, orderBy("created", "desc"));

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.map((item) => item.data());
  const categoryMap1 = querySnapshot.docs.map((item) => {
    return {
      ...item.data(),
      mainId: item.id,
    };
  });
  console.log("sdjsvfd", categoryMap1);
  console.log("1", categoryMap);
  return categoryMap1;
};
export const deletePost = async (uid) => {
  console.log("dle", uid);
  console.log("ppp1", deleteDoc(doc(db, "posts", uid)));
  console.log("ppl2", await deleteDoc(doc(db, "posts", uid)));
  await deleteDoc(doc(db, "posts", uid));
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthChangeHandler = (callback) =>
  onAuthStateChanged(auth, callback);
