(function (window) {
  'use strict';

  var version = '1.0.0';
  var chunk;

  chunk = function () {
    return new chunk.fn.init();
  };

  chunk.fn = chunk.prototype = {

    constructor: chunk,
    version: version,
    totalChunks: 0,
    nextChunk: 1,
    lastChunk: 0,
    config: {
      wait: 2500
    },

    init: function () {
      return this;
    },

    configure: function (config) {
      this.config = join(this.config, config);
    },

    next: function () {

    },

    prev: function () {

    },

    from: function () {

    },

    run: function () {
      processChunk(this.fn);

    },

    end: function () {
      console.log('Chunkit Execution Complete.');
    },

    // arr, chunks, fn, end, runAll
    chunk: function (o) {
      this.chunks = buildChunks(o.arr, o.numOfChunks);
      this.totalChunks = o.numOfChunks;
      this.wait = this.config.wait;
      this.end = o.end || this.end;
      this.fn = o.fn;

      return this;

    }

  };

  chunk.fn.init.prototype = chunk.fn;

  if (typeof chunkit === "undefined") {
    window.chunkit = chunk();
  }

  function join(obj1, obj2) {
    for (var attrname in obj2) {
      obj1[attrname] = obj2[attrname];
    }
    return obj1;
  }

  function buildChunks(array, numOfChunks) {
    var len = array.length;
    var itemsPerChunk = len % numOfChunks === 0 ? len / numOfChunks + 1 : len / numOfChunks;
    var endChunk = itemsPerChunk;
    var processedChunks = 0;
    var chunks = [];
    var i = 0;

    _buildChunkRecursive();

    function _buildChunkRecursive() {
      var tempArr = [];

      if (processedChunks < numOfChunks) {

        for (i; i < endChunk; i++) {
          if (i == len) break;
          tempArr.push(array[i]);
        }

        chunks.push(tempArr);
        endChunk += itemsPerChunk;
        processedChunks++;
        _buildChunkRecursive();

      }

    }

    return chunks;

  }

  function processChunk(fn) {
    var currentChunk = chunkit.lastChunk === 0 ? 1 : chunkit.lastChunk + 1;
    var loopCount = chunkit.numOfChunks;

    _loop();

    function _loop() {
      if (currentChunk > chunkit.totalChunks) {
        chunkit.end();
        return;
      }

      for (var i = 0; i < chunkit.chunks[currentChunk].length; i++) {
        fn(chunkit.chunks[currentChunk][i]);
      }
      
      currentChunk++

      _loop();

    }

  }

}(window));