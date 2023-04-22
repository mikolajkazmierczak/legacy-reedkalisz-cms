import auth from '#services/auth';

function schemaWithAuthor(model) {
  const schema = model.schema.paths;
  return 'createdBy._id' in schema;
}

function sanitize(query, { allowFilter = false, allowEmpty = false } = {}) {
  // Return a filter or throw based on the options and query parameter format
  // query : string - { _id: query }
  //       : array - { _id: { $in: query } }
  //       : object - query (filter)
  if (!query && !allowEmpty)
    throw '{query} parameter was not defined in the request body';
  if (typeof query == 'string') return { _id: query };
  if (Array.isArray(query)) return { _id: { $in: query } };
  if (allowFilter) return query;
  throw '{query} did not contain the required id (str) or list of ids (array)';
}

export default {
  create: (req, model, query, options = {}) => {
    // query : object - create a single doc
    //       : array - create multiple docs
    console.log('create\n', query);

    if (!Array.isArray(query)) query = [query];

    // add createdBy and updatedBy fields if they exist in the schema
    if (schemaWithAuthor(model)) {
      const user = auth.getSession(req);
      query.forEach(doc => {
        doc.createdBy = user;
        doc.updatedBy = user;
      });
    }

    return model.insertMany(query, options);
  },

  read: async (
    model,
    query,
    { limit = 20, offset = 0, props = '', options = {}, all = false } = {}
  ) => {
    // query : string - read a single doc (id)
    //       : array - read multiple docs (ids)
    //       : object - read docs based on a filter
    // options : object
    // - limit : int - pagination limit
    // - offset : int - pagination offset
    // - props : string - mongoose projection
    // - options : object - mongoose options
    query = sanitize(query, { allowFilter: true, allowEmpty: true });
    console.log('read\n', query);

    props += ' -__v';
    let opt = { limit, skip: offset, ...options };
    if (all) delete opt.limit;
    const docs = await model.find(query, props, opt).exec();
    if (docs.length === 0) return null;
    if (limit == 1) return docs[0];
    return docs;
  },

  update: (req, model, query, updates, options = {}) => {
    // query : string - update a single doc (id)
    //       : array - update multiple docs (ids) with the same data
    // updates : object - the updates to perform
    query = sanitize(query);
    console.log('update\n', query, '\n', updates);

    // refresh updatedBy field if it exists in the schema
    if (schemaWithAuthor(model)) {
      const user = auth.getSession(req);
      updates.updatedBy = user;
    }

    if (query) return model.updateMany(query, updates, options).exec();
  },

  del: (model, query, options = {}) => {
    // query : string - delete a single doc (id)
    //       : array - delete multiple docs (ids)
    query = sanitize(query);
    console.log('delete\n', query);

    if (query) return model.deleteMany(query, options).exec();
  },
};
