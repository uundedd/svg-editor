import { nodeMaptoArray } from './node-map-to-array'; // Adjust the import according to your file structure

describe('nodeMapToArray', () => {
  it('should convert NamedNodeMap to array of Attr objects', () => {
    // Create a sample element
    const element = document.createElement('div');
    element.setAttribute('id', 'myDiv');
    element.setAttribute('class', 'container');

    // Get the NamedNodeMap from the element
    const attributes = element.attributes;

    // Convert NamedNodeMap to array
    const result = nodeMaptoArray(attributes);

    // Assertions
    expect(result).toHaveLength(2); // Expecting 2 attributes
    expect(result[0].name).toBe('id');
    expect(result[0].value).toBe('myDiv');
    expect(result[1].name).toBe('class');
    expect(result[1].value).toBe('container');
  });

  it('should return an empty array for an empty NamedNodeMap', () => {
    const element = document.createElement('div');

    // Get the NamedNodeMap from the element (which has no attributes)
    const attributes = element.attributes;

    // Convert NamedNodeMap to array
    const result = nodeMaptoArray(attributes);

    // Assertions
    expect(result).toHaveLength(0); // Expecting an empty array
  });
});
