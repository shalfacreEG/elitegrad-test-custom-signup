function buildLookup(id_field, list) {
  let lookup = {};
  for (let item of list) {
    let id = item[id_field];
    lookup[id] = item;
  }
  return lookup;
}

export function diffById(id_field, original, buffer) {
  // build the 2 lookups
  let originalLookup = buildLookup(id_field, original);
  let bufferLookup = buildLookup(id_field, buffer);

  let added = [];
  let changed = [];
  let deleted = [];

  // go through buffer:
  // if new: add to added array
  // if not new: check if changed, and add to changed array
  for (let item of buffer) {
    let id = item[id_field];
    let found = originalLookup[id];
    if (found) {
      if (JSON.stringify(item) !== JSON.stringify(found)) changed.push(item);
    } else {
      added.push(item);
    }
  }

  // go through original
  // if not exist in buffer: add to deleted array
  for (let item of original) {
    let id = item[id_field];
    if (!bufferLookup[id]) deleted.push(item);
  }

  return { added, changed, deleted };
}

export function diffByValue(value_field, original, newValues) {
  let added = [];
  let deleted = [];

  // go through newValues:
  // if not found: add to added array
  for (let value of newValues) {
    let found = original.find(item => item[value_field] === value);
    if (!found) {
      added.push(value);
    }
  }

  // go through original
  // if not exist in buffer: add to deleted array
  for (let item of original) {
    let value = item[value_field];
    let found = newValues.find(nv => nv === value);
    if (!found) {
      deleted.push(value);
    }
  }

  return { added, deleted };
}
