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

    step: function () {
      processChunk({
        startFromChunk: this.lastChunk,
        fn: this.fn
      })
    },

    from: function (startFrom, runAllFlag) {
      processChunk({
        runAllFlag: runAllFlag || false,
        startFromChunk: startFrom,
        fn: this.fn
      });
    },

    run: function () {
      processChunk({
        runAllFlag: true,
        fn: this.fn
      });

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

  function processChunk(options) {
    var currentChunk = options.startFromChunk || 0;
    var loopCount = chunkit.numOfChunks;

    _loop();

    function _loop() {

      if (currentChunk >= chunkit.totalChunks) {
        chunkit.totalChunks = 0;
        chunkit.lastChunk = 0;
        chunkit.nextChunk = 1;
        chunkit.chunks = [];
        chunkit.fn = null;
        chunkit.end();
        return;
      }

      for (var i = 0; i < chunkit.chunks[currentChunk].length; i++) {
        options.fn(chunkit.chunks[currentChunk][i]);
      }

      console.log('Chunk ' + currentChunk + ' Finished.');

      currentChunk++;
      chunkit.lastChunk++;
      chunkit.nextChunk++;

      if (options.runAllFlag) {

        setTimeout(function () {
          _loop();
        }, chunkit.config.wait);

      }

    }

  }

}(window));