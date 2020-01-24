export const getRecords = (firestore, limit=10) => {
  firestore.collection("records")
    .orderBy("created_at", "desc")
    .limit(limit)
    .get()
    .then((querySnapshot) => {
      return querySnapshot;
      querySnapshot.forEach(doc => {
        console.log(doc.data());
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
      return null;
    });
};
