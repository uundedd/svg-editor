export function nodeMaptoArray(
  attibutes: NamedNodeMap,
): NamedNodeMap[number][] {
  const array = [];
  // iterate backwards ensuring that length is an UInt32
  for (let i = attibutes.length >>> 0; i--; ) {
    array[i] = attibutes[i];
  }
  return array;
}
