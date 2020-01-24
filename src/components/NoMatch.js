import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase';

export const NoMatch = () => {

  return (
    <div>
    </div>
  );
}

const Example = () => {
  const auth = useSelector(state => state.firebase.auth);
  const firestore = useFirestore();
  const a = () => {
    console.log("fuck");
    firestore.collection('records').add({text: 'oppaii'});
  };
  useEffect(() => {
    if (isLoaded(auth) && !isEmpty(auth)) {
      firestore.collection("records")
        .orderBy("created_at", "desc")
        .limit(10)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(doc => {
            console.log(doc.data());
          });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }
  });
  return (
    <div>
      <button onClick={a}>fuck</button>
    </div>
  );
};
