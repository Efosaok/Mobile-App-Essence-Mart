import firebase from "../firebase";

const firestore = firebase.firestore();

export const executeOnce = (change, context, task) => {
  const eventRef = firestore.collection('events').doc(context.eventId);

  return firestore.runTransaction(t =>
    t
      .get(eventRef)
      .then(docSnap => (docSnap.exists ? null : task(t)))
      .then(() => t.set(eventRef, { processed: true }))
  );
};

export const documentCounter = collectionName => (change, context) =>
  executeOnce(change, context, t => {
    // on create
    if (!change.before.exists && change.after.exists) {
      return t
        .get(firestore.collection('metadatas')
        .doc(collectionName))
        .then(docSnap =>
            t.set(docSnap.ref, {
                count: ((docSnap.data() && docSnap.data().count) || 0) + 1
            }));
    // on delete
    } else if (change.before.exists && !change.after.exists) {
      return t
        .get(firestore.collection('metadatas')
        .doc(collectionName))
        .then(docSnap =>
        t.set(docSnap.ref, {
            count: docSnap.data().count - 1
        }));
    }

    return null;
  });

export default {
  documentCounter,
  executeOnce,
}
