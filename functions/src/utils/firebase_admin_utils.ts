export const setDocField = async (
  admin: any,
  firestore: any,
  docPath: string,
  fieldName: any,
  fieldVal: any
) => {
  if (admin !== null) {
    firestore = admin.firestore();
  }

  let docRef = await firestore.doc(docPath);
  docRef
    .update({
      [fieldName]: fieldVal,
    })
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error: any) => {
      console.error("Error updating document: ", error);
    });
};

export const getDocData = async (
  admin: any,
  firestore: any,
  docPath: string
) => {
  if (admin !== null) {
    firestore = admin.firestore();
  }
  const docSnapshot = await firestore.doc(docPath).get();
  return docSnapshot.data();
};

export const getCollectionInfo = async (
  admin: {
    firestore: () => {
      (): any;
      new (): any;
      collection: {
        (arg0: any): { (): any; new (): any; get: { (): any; new (): any } };
        new (): any;
      };
    };
  },
  collectionPath: any
) => {
  const collectionSnapshot = await admin
    .firestore()
    .collection(collectionPath)
    .get();
  const collection = collectionSnapshot.docs.map(
    (doc: { id: any; data: () => any }) => {
      return { id: doc.id, ...doc.data() };
    }
  );
  return collection;
};
