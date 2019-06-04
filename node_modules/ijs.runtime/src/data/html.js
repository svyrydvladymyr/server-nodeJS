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
// html.js
// Object that allows constructing HTML along with some optional associated
// script, and alternate text.
//

var script = require('./script');

function HTML(markup) {
  this._markup = markup;
  this._classes = [];
  this._script = null;
  this._text = null;
}

HTML.prototype.addClass = function(className) {
  this._classes.push(className);
  return this;
}

HTML.prototype.addDependency = function(path, name) {
  this._script.addDependency(path, name);
  return this;
}

HTML.prototype.addScript = function(js) {
  this._script = script.create(js);
  return this;
}

HTML.prototype.text = function(text) {
  this._text = text;
  return this;
}

HTML.prototype.toHTML = function() {
  if (!this._script && !this._classes.length) {
    return this._markup;
  }

  var id = '_' + new Date().valueOf();
  var classes = this._classes.join(' ');

  var markupBuilder = [];
  markupBuilder.push('<div ');
  markupBuilder.push('id="' + id + '" ')
  markupBuilder.push('class="' + classes + '"')
  markupBuilder.push('>');
  if (this._markup) {
    markupBuilder.push(this._markup);
  }
  markupBuilder.push('</div>');
  if (this._script) {
    this._script.addDependency('elem!' + id, 'elem');

    markupBuilder.push('<script>');
    markupBuilder.push(this._script.toScript());
    markupBuilder.push('</script>');
  }

  return markupBuilder.join('');
}

HTML.prototype.toText = function() {
  return this._text;
}


module.exports = {
  create: function(markup) {
    return new HTML(markup);
  }
};
