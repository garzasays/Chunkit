# ChunkIt

ChunkIt is a JS Utility that allows you to break large arrays into smaller chunks and process them through a function. We had an odd request come in at work, where we were asked to update all the users in our organization in an old 3rd Party System. Of course, the system could only be updated via REST. This utility was born from that chaos, as we updated over 8,000 records via REST calls. 


# Basic Usage

```js

// First you must call chunkit.chunk. 
// This method takes an Object as an
// argument.
chunkit.chunk({

  // Pass in the array. 
  chunks: '<Required - Array>',

  // Add the number of chunks you would like to break 
  // your array into
  numOfChunks: '<Required - Number of Chunks - Number>',

  // Time (in ms) to pause before processing next chunk
  // Default is 2500
  wait: '<Optional - Time - Number>',

  // This function will be passed the current item as an 
  // argument. This function will be called for every item
  // in your array.
  fn: '<Required - Function>',

  // This function is called at the completion. If nothing
  // is passed in, ChunkIt will simply log when complete.
  end: '<Optional - Function>'

});

// ChunkIt Methods

// The run function kicks off ChunkIt. This is basically 
// a loop that executes your ChunkIt config. 
.run()

// The step function allows you to step through chunks. 
// When called, Step will execute the current chunk and stop.
// step can then be called again to do the next chunk.
.step()

// The from function allows you to start ChunkIt on whatever
// chunk you pass into startFrom. The runAllFlag takes true or 
// false as input. If true is passed in, ChunkIt will start at
// the chunk you selected and continue through all the other
// chunks. Otherwise from will execute similar to step().
.from(startFrom, runAllFlag)

```

# Example

```js

var testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

chunkit.chunk({
  arr: testArr,
  numOfChunks: 4,
  fn: function (data) {
    console.log(data)
  }
}).run()

```
