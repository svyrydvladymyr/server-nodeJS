// Copyright 2015 Interactive Computing project (https://github.com/interactivecomputing).
// All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file
// except in compliance with the License. You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software distributed under the
// License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied. See the License for the specific language governing permissions
// and limitations under the License.
//
// image.js
// Object that allows constructing image data along with some optional alternate text.
//

function Image(buffer) {
  this._buffer = buffer;
  this._text = null;
}

Image.prototype.mime = function(mime) {
  this._buffer.mime = mime;
  return this;
}

Image.prototype.text = function(text) {
  this._text = text;
  return this;
}

Image.prototype.toImage = function() {
  return this._buffer;
}

Image.prototype.toText = function() {
  return this._text;
}


module.exports = {
  create: function(buffer) {
    return new Image(buffer);
  }
};
