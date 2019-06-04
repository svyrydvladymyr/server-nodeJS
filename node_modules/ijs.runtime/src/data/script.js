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
// script.js
// Object that allows constructing client-side javascript along with
// any dependencies that should be resolved, and alternate text.
//

function Script(js) {
  this._js = js;
  this._dependencies = [];
  this._text = null;
}

Script.prototype.addDependency = function(path, name) {
  this._dependencies.push(path);
  this._dependencies.push(name);
  return this;
}

Script.prototype.text = function(text) {
  this._text = text;
  return this;
}

Script.prototype.toScript = function() {
  if (!this._dependencies.length) {
    return this._js;
  }

  var scriptBuilder = [];
  scriptBuilder.push('require([');
  for (var i = 0; i < this._dependencies.length; i += 2) {
    if (i != 0) {
      scriptBuilder.push(',');
    }
    scriptBuilder.push('"' + this._dependencies[i] + '"');
  }
  scriptBuilder.push('], function(');
  for (var i = 1; i < this._dependencies.length; i += 2) {
    if (i != 1) {
      scriptBuilder.push(',');
    }
    scriptBuilder.push(this._dependencies[i]);
  }
  scriptBuilder.push(') {\n');
  scriptBuilder.push(this._js);
  scriptBuilder.push('\n});');

  return scriptBuilder.join('');
}

Script.prototype.toText = function() {
  return this._text;
}


module.exports = {
  create: function(js) {
    return new Script(js);
  }
};
