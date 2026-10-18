/* dc-lite: rendert die Entwurfs-Vorlagen (Template-Baum + Logik-Klasse) mit React. */
(function () {
  var h = React.createElement;
  var tree = JSON.parse(document.getElementById('dc-tree').textContent);
  var logicSrc = document.getElementById('dc-logic').textContent;
  var propsDef = JSON.parse(document.getElementById('dc-props').textContent || '{}');

  function DCLogic() { this.state = {}; this.props = {}; }
  DCLogic.prototype.setState = function (p) {
    var cur = this.state || {};
    var patch = typeof p === 'function' ? p(cur, this.props) : p;
    this.state = Object.assign({}, cur, patch || {});
    if (this.__rerender) this.__rerender();
  };
  var Component = new Function('DCLogic', logicSrc + '\n;return Component;')(DCLogic);
  var inst = new Component();
  if (!inst.state) inst.state = {};
  var props = {};
  Object.keys(propsDef).forEach(function (k) { if (k.charAt(0) !== '$' && propsDef[k] && 'default' in propsDef[k]) props[k] = propsDef[k].default; });
  inst.props = props;

  var exprCache = {};
  function evalExpr(expr, scope) {
    var fn = exprCache[expr];
    if (!fn) { fn = exprCache[expr] = new Function('scope', 'with (scope) { return (' + expr + '); }'); }
    try { return fn(scope); } catch (e) { return undefined; }
  }
  var RE = /\{\{([\s\S]*?)\}\}/g;
  function resolve(str, scope) {
    var m = /^\s*\{\{([\s\S]*?)\}\}\s*$/.exec(str);
    if (m && str.indexOf('{{', 2) === -1) return evalExpr(m[1], scope);
    return str.replace(RE, function (_, e) { var v = evalExpr(e, scope); return v == null ? '' : String(v); });
  }
  function camel(p) { return p.indexOf('--') === 0 ? p : p.replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); }); }
  function parseStyle(s) {
    var o = {};
    String(s).split(';').forEach(function (decl) {
      var i = decl.indexOf(':'); if (i < 0) return;
      var k = decl.slice(0, i).trim(); var v = decl.slice(i + 1).trim();
      if (k) o[camel(k)] = v;
    });
    return o;
  }
  var EVENTS = { onclick: 'onClick', onchange: 'onChange', onmousedown: 'onMouseDown', onkeydown: 'onKeyDown', onkeyup: 'onKeyUp', onfocus: 'onFocus', onblur: 'onBlur', oninput: 'onInput', onsubmit: 'onSubmit', onmouseenter: 'onMouseEnter', onmouseleave: 'onMouseLeave' };
  var RENAME = { 'class': 'className', 'for': 'htmlFor', tabindex: 'tabIndex', readonly: 'readOnly', contenteditable: 'contentEditable', inputmode: 'inputMode', colspan: 'colSpan', rowspan: 'rowSpan', maxlength: 'maxLength', autocomplete: 'autoComplete', viewbox: 'viewBox', 'accept-charset': 'acceptCharset', crossorigin: 'crossOrigin', srcset: 'srcSet', spellcheck: 'spellCheck', autofocus: 'autoFocus' };
  var BOOL = { checked: 1, readOnly: 1, required: 1, disabled: 1, selected: 1, hidden: 1, multiple: 1, autoFocus: 1, open: 1 };

  function render(node, scope, key) {
    if (typeof node === 'string') {
      if (node.indexOf('{{') === -1) return node;
      var v = resolve(node, scope);
      return v == null || v === false ? null : String(v);
    }
    var tag = node[0], attrs = node[1], kids = node[2];
    if (tag === 'sc-if') {
      return resolve(attrs.value || '', scope) ? h(React.Fragment, { key: key }, renderKids(kids, scope)) : null;
    }
    if (tag === 'sc-for') {
      var list = resolve(attrs.list || '', scope) || [];
      var as = (attrs.as || 'item').trim();
      return h(React.Fragment, { key: key }, list.map(function (item, i) {
        var s = Object.create(scope); s[as] = item; s.index = i;
        return h(React.Fragment, { key: i }, renderKids(kids, s));
      }));
    }
    var p = { key: key };
    Object.keys(attrs).forEach(function (a) {
      if (a.indexOf('hint-placeholder') === 0) return;
      var raw = attrs[a];
      var v = raw.indexOf('{{') === -1 ? raw : resolve(raw, scope);
      var name = EVENTS[a] || RENAME[a] || a;
      if (name === 'style') { p.style = parseStyle(v); return; }
      if (BOOL[name]) { p[name] = v === '' ? true : (v === 'false' ? false : !!v); return; }
      if (name === 'value' && (tag === 'input' || tag === 'textarea' || tag === 'select')) { p.value = v == null ? '' : v; return; }
      p[name] = v;
    });
    if ((tag === 'input' || tag === 'textarea' || tag === 'select') && 'value' in p && !p.onChange) p.readOnly = p.readOnly || tag !== 'select';
    if (p.contentEditable) p.suppressContentEditableWarning = true;
    var children = renderKids(kids, scope);
    if (tag === 'textarea') return h(tag, p);
    return children.length ? h.apply(null, [tag, p].concat(children)) : h(tag, p);
  }
  function renderKids(kids, scope) {
    var out = [];
    for (var i = 0; i < kids.length; i++) { var r = render(kids[i], scope, i); if (r !== null && r !== undefined) out.push(r); }
    return out;
  }

  function App() {
    var force = React.useReducer(function (x) { return x + 1; }, 0)[1];
    var mounted = React.useRef(false);
    inst.__rerender = force;
    React.useEffect(function () {
      if (!mounted.current) { mounted.current = true; if (inst.componentDidMount) inst.componentDidMount(); }
      else if (inst.componentDidUpdate) inst.componentDidUpdate();
    });
    var vals = inst.renderVals ? inst.renderVals() : {};
    var scope = Object.assign({}, props, vals);
    return h(React.Fragment, null, renderKids(tree, scope));
  }
  ReactDOM.createRoot(document.getElementById('dc-root')).render(h(App));
})();
