const replaceSpaces = require('../src/replaceSpaces');

test('replaces spaces fire bang to fire+bang', () => {
	expect(replaceSpaces("fire bang")).toBe("fire+bang");
});