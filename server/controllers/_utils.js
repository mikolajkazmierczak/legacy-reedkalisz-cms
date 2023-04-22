export const isObjectEmpty = object => {
  return Object.keys(object).length === 0;
};

export const getModelName = model => {
  // Get the name of a model as a string,
  // capitalize first letter and remove last letter ("s").
  let name = model.collection.collectionName;
  return name[0].toUpperCase() + name.slice(1, -1);
};
